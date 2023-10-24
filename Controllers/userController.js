const authorModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const userSignup = async (req, res) => {
  try {
    const { fullName, email, password, profession } = req.body;
    const errors = {};

    if (!fullName) {
      errors.fullName = "Full Name is required.";
    }
    if (!email) {
      errors.email = "Email is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: "error",
        errors,
      });
    }

    const existingUser = await authorModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "User already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await authorModel.create({
      fullName,
      email,
      profession,
      password: hashedPassword,
    });

    return res.status(200).json({
      status: "success",
      message: "User successfully registered",
    });
  } catch (error) {
    console.error("Error in userSignup:", error);
    return res.status(500).json({
      status: "error",
      message: "An internal server error occurred. Please try again later.",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = {};

    if (!email) {
      errors.email = "Email is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: "error",
        errors,
      });
    }

    const user = await authorModel.findOne({ email });
    if (user) {
      const confirmPassword = await bcrypt.compare(password, user.password);
      if (confirmPassword) {
        const token = jwt.sign(
          { fullName: user.fullName, email: user.email, author: user._id },
          process.env.JWT_KEY
        );
        return res.status(200).json({
          token,
          status: "success",
          message: "Successful Login",
        });
      } else {
        return res.status(401).json({
          status: "error",
          message:
            "Wrong email or password. Please check your credentials and try again.",
        });
      }
    } else {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
};
