require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserRouter = require("./routes/Userroutes");
const PostRouter = require("./routes/Postroutes");

app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/posts", PostRouter);
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then((conn) => {
    console.log(`MongoDB Started..!`);
    app.listen(process.env.PORT, (error) => {
      console.log(`Server Started On Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
