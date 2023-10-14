const authorModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const userSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: "error",
        message:
          "One or more required fields are empty. Please ensure all mandatory fields are filled out.",
      });
    }
    const user = await authorModel.findOne({ email });

    if (!user) {
      const hashpaword = await bcrypt.hash(password, 8);
      const newUser = await authorModel.create({
        fullName,
        email,
        password: hashpaword,
      });
      await newUser.save();
      return res
        .status(200)
        .json({ status: "succcess", message: "User Successfull Registered" });
    } else {
      res
        .status(409)
        .json({ status: "error", message: "User already registered " });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message:
          "Please enter your email and password to log in. All fields are required",
      });
    }
    const user = await authorModel.findOne({ email });
    if (user) {
      const confirmpassword = await bcrypt.compare(password, user.password);
      if (confirmpassword) {
        const token = jwt.sign(
          { fullName: user.fullName, email: user.email, author: user._id },
          process.env.JWT_KEY
        );
        res
          .status(200)
          .json({ token, status: "succcess", message: "Successfull Login" });
      } else {
        return res.status(401).json({
          status: "error",
          message:
            "wrong email or password. Please check your credentials and try again.",
        });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  userSignup,
  userLogin,
};
