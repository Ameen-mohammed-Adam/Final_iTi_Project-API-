const joi = require("joi");
const { Login } = require("../../Controlers/userControler");
const SignUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  bio: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().max(5).optional(),
});

const LoginSchema = joi.object({
  password: joi.string().required(),
  email: joi.string().email().required(),
  token: joi.string().required(),
});

module.exports = { LoginSchema, SignUpSchema };
