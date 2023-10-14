const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
  },
  profession: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const authorModel = mongoose.model("Users", authorSchema);
module.exports = authorModel;
