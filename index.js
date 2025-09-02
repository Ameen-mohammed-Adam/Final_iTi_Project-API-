require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserRouter = require("./routes/Userroutes");
const PostRouter = require("./routes/Postroutes");
const authRouter = require("./routes/authroutes");
const User = require("./Models/UserSchema");

app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/posts", PostRouter);
app.use("/api", authRouter);
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then(async () => {
    console.log(`MongoDB Started..!`);
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("✅ Admin already exists.");
    } else {
      const admin = await User.create({
        name: "Commander Admin",
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
      });

      console.log("First admin created.");
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

module.exports = app;
