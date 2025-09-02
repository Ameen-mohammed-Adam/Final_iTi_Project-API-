const joi = require("joi");

const CreateUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  bio: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().max(5).optional(),
});

const UpdateUserSchema = CreateUserSchema.fork(
  ["name", "email", "bio", "password", "role"],
  (schema) => schema.optional()
);

module.exports = {
  UpdateUserSchema,
};
