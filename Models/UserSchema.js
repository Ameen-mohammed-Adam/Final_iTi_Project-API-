const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const user = mongoose.model("User", userSchema);

module.exports = user;
