const AppError = require("../utils/AppError");
const User = require("../Models/UserSchema");
const Post = require("../Models/PostsSchema");

//

const getAllusers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ message: "Successful", users });
};
//
const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new AppError("Make Sure Id is Correct!", 404);
  }
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    throw new AppError("Token Is Wrong!", 400);
  }
  res.status(200).json({ user });
};

//
const UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;

    // 1. Check if user exists
    const user = await User.findById(id);
    if (!user) {
      throw new AppError("User Not Found.", 404);
    }

    // 2. Authorization: only admin or owner can update
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== user._id.toString()
    ) {
      return res.status(403).json({ message: "You do not own this account" });
    }

    // 3. Perform update
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, // return updated document
      runValidators: true, // re-run schema validators
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

//
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User Is Not Found.", 404);
  }
  if (
    req.user.role !== "admin" &&
    req.user._id.toString() !== user._id.toString()
  ) {
    throw new AppError("You do not own this account", 404);
  }
  const { deletedCount } = await Post.deleteMany({ autherId: user._id });
  await User.findByIdAndDelete(id);
  res
    .status(200)
    .json({ message: "User Deleted Successfuly", deletedPosts: deletedCount });
};
//

module.exports = {
  getUserById,
  getAllusers,
  UpdateUser,
  deleteUser,
};
