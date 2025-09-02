const AppError = require("../utils/AppError");
const User = require("../Models/UserSchema");
const Post = require("../Models/PostsSchema");
const bcrypt = require("bcrypt");
//
const signUp = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (user) {
    throw new AppError("This User already exists", 400);
  }
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.password, 12);
  const newUser = await User.create({
    name: body.name,
    email: body.email,
    bio: body.bio,
    password: hashedPassword,
    role: body.role,
  });

  res.status(201).json({ message: "New User Was Created!" });
};
const getAllusers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ message: "Successful", users });
};
//
const Login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Make Sure Email And Password Are Correct", 404);
  }
  const maches = await bcrypt.compare(password, user.password);
  if (!maches) {
    throw new AppError("Make Sure Email And Password Are Correct", 404);
  }
  res.status(200).json({ user });
};
//
const UpdateUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!user) {
    throw new AppError("User Is Not Found.", 404);
  }
  res.status(200).json({ user });
};
//
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError("User Is Not Found.", 404);
  }
  const { deletedCount } = await Post.deleteMany({ autherId: user._id });
  res
    .status(200)
    .json({ message: "User Deleted Successfuly", deletedPosts: deletedCount });
};
//

module.exports = {
  signUp,
  getAllusers,
  Login,
  UpdateUser,
  deleteUser,
};
