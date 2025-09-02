const express = require("express");
const Router = express.Router();
const validate = require("../middleWares/validate");
const {
  CreatePostValidation,
  UpdatePostValidation,
} = require("../utils/Validations/PostValidations");
const {
  CreatePost,
  getAllPosts,
  getPostById,
  UpdatePost,
  DeletePost,
} = require("../Controlers/PostCntroler");
Router.get("/", getAllPosts);
Router.post("/", validate(CreatePostValidation), CreatePost);
Router.get("/:id", getPostById);
Router.put("/:id", validate(UpdatePostValidation), UpdatePost);
Router.delete("/:id", DeletePost);

module.exports = Router;
