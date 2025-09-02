const express = require("express");
const Router = express.Router();
const {
  Login,
  signUp,
  restrictTo,
  protect,
} = require("../Controlers/authControler");
const validate = require("../middleWares/validate");
const {
  LoginSchema,
  SignUpSchema,
} = require("../utils/Validations/authValidations");

Router.post("/signup", validate(SignUpSchema), signUp);
Router.post("/login", protect, validate(LoginSchema), Login);
module.exports = Router;
