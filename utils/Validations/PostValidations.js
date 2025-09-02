const Joi = require("joi");

const CreatePostValidation = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  autherId: Joi.string().required(),
  image: Joi.string().required(),
});

const UpdatePostValidation = CreatePostValidation.fork(
  ["title", "content", "autherId", "image"],
  (schema) => schema.optional()
);

module.exports = {
  CreatePostValidation,
  UpdatePostValidation,
};
