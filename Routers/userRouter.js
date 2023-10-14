const express = require("express");
const { userSignup, userLogin } = require("../Controllers/userController");

const userRouter = express.Router();
// sign up the users
userRouter.post("/signup", userSignup);
// login users to get token
userRouter.post("/login", userLogin);

module.exports = userRouter;
