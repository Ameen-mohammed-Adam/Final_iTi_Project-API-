const express = require("express");
const Router = express.Router();
const {
  Login,
  signUp,
  restrictTo,
  protect,
} = require("../Controlers/authControler");
const {
  getUserById,
  getAllusers,
  UpdateUser,
  deleteUser,
} = require("../Controlers/userControler");
const { UpdateUserSchema } = require("../utils/Validations/UserValidations");
const validate = require("../middleWares/validate");

Router.get("/", protect, restrictTo("admin"), getAllusers);
Router.get("/:id", protect, getUserById);
Router.put("/:id", protect, validate(UpdateUserSchema), UpdateUser);
Router.delete("/:id", protect, deleteUser);

module.exports = Router;
