const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, unique: true, required: true },
    autherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String },
  },
  { timeStamp: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
