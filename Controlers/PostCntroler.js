const Post = require("../Models/PostsSchema");
const User = require("../Models/UserSchema");
const AppError = require("../utils/AppError");
//
const CreatePost = async (req, res) => {
  const body = req.body;
  const user = await User.findById(body.autherId);

  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  const imageUrl = req.images ? req.images[0] : null;

  const post = await Post.create({
    title: body.title,
    content: body.content,
    autherId: user._id,
    image: imageUrl,
  });

  res.status(201).json({
    message: "Post Created Successfully",
    post,
  });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("autherId");
  res.status(200).json({ posts });
};
const getPostById = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (
    req.user.role !== "admin" &&
    req.user._id.toString() !== post.autherId.toString()
  ) {
    return res.status(403).json({ message: "You do not own this post" });
  }
  if (!post) {
    throw new AppError("Make sure the id of the post is correct", 404);
  }
  res.status(200).json({ post });
};
const UpdatePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError("Post Not Found!", 404);
  }
  if (
    req.user.role !== "admin" &&
    req.user._id.toString() !== post.autherId.toString()
  ) {
    return res.status(403).json({ message: "You do not own this post" });
  }
  post = await Post.Update(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ post });
};
const DeletePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (
    req.user.role !== "admin" &&
    req.user._id.toString() !== post.autherId.toString()
  ) {
    return res.status(403).json({ message: "You do not own this post" });
  }

  if (!post) {
    throw new AppError("Post Not Found!", 404);
  }
  await Post.delete(post);
  res.status(200).json({ message: "Post Deleted Successfuly" });
};

module.exports = {
  CreatePost,
  getAllPosts,
  getPostById,
  UpdatePost,
  DeletePost,
};
