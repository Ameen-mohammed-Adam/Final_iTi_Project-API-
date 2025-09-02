const express = require("express");
const Router = express.Router();

const {
  signUp,
  getAllusers,
  Login,
  UpdateUser,
  deleteUser,
} = require("../Controlers/userControler");
const {
  CreateUserSchema,
  UpdateUserSchema,
} = require("../utils/Validations/UserValidations");
const validate = require("../middleWares/validate");
Router.get("/", getAllusers);
Router.get("/login", Login);
Router.post("/signup", validate(CreateUserSchema), signUp);
Router.put("/:id", validate(UpdateUserSchema), UpdateUser);
Router.delete("/:id", deleteUser);

module.exports = Router;
