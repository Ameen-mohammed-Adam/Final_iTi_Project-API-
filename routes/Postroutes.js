const express = require("express");
const Router = express.Router();
const validate = require("../middleWares/validate");
const {
  Login,
  signUp,
  restrictTo,
  protect,
} = require("../Controlers/authControler");
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
const { uploadCDN, uploadImageKit } = require("../middleWares/Multer-upload");
Router.get("/", protect, restrictTo("admin"), getAllPosts);
Router.post(
  "/",
  validate(CreatePostValidation),
  uploadCDN.single("image"),
  uploadImageKit(false),
  CreatePost
);
Router.get("/:id", protect, getPostById);
Router.put("/:id", validate(UpdatePostValidation), protect, UpdatePost);
Router.delete("/:id", protect, DeletePost);

module.exports = Router;
