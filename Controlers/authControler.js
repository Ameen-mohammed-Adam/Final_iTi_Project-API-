const AppError = require("../utils/AppError");
const User = require("../Models/UserSchema");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res) => {
  const { name, email, bio, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new AppError("This User already exists", 400);
  }
  const newUser = await User.create({
    name: name,
    email: email,
    bio: bio,
    password: password,
  });
  const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res.status(201).json({ message: "New User Was Created!", JWT_Token: token });
};
//
const Login = async (req, res) => {
  const { email, password, token } = req.body;
  const user = await User.findOne({ email });
  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  if (!user) {
    throw new AppError(
      "Make Sure Email And Password Are Correct or Token",
      404
    );
  }
  if (token && decoded) {
    res.status(200).json({ user });
  }
  const maches = await bcrypt.compare(password, user.password);
  if (!maches) {
    throw new AppError("Make Sure Email And Password Are Correct", 404);
  }

  res.status(200).json({ user });
};

const protect = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Token missing!" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("The user no longer exists.", 401));
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
module.exports = {
  Login,
  signUp,
  restrictTo,
  protect,
};
