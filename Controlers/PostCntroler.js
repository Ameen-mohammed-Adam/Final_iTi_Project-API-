const Post = require("../Models/PostsSchema");
const User = require("../Models/UserSchema");
const AppError = require("../utils/AppError");
//
const CreatePost = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ _id: body.autherId });
  if (!user) {
    throw new AppError("User Not Found", 404);
  }
  const post = await Post.create({
    title: body.title,
    content: body.content,
    autherId: user._id,
    image: body.image,
  });
  res.status(201).json({ message: "Post Created Succesfuly" });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("autherId");
  res.status(200).json({ posts });
};
const getPostById = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError("Make sure the id of the post is correct", 404);
  }
  res.status(200).json({ post });
};
const UpdatePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    throw new AppError("Post Not Found!", 404);
  }
  res.status(201).json({ post });
};
const DeletePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    throw new AppError("Post Not Found!", 404);
  }
  res.status(200).json({ message: "Post Deleted Successfuly" });
};

module.exports = {
  CreatePost,
  getAllPosts,
  getPostById,
  UpdatePost,
  DeletePost,
};
