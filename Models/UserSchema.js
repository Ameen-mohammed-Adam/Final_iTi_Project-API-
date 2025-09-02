const { timeStamp } = require("console");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    bio: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      require: true,
    },
  },
  { timeStamp: true }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
