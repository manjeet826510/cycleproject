import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    console.log("get is called");
    const users = await User.find();
    // console.log(products);
    res.send(users);
  });

userRouter.post("/signup",
  expressAsyncHandler(async (req, res) => {
    console.log("post is called");
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    console.log(user);
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  })
);


export default userRouter;
