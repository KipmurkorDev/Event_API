const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type: String,
    // required: true,
  },
  imagePublicId: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },

  location: {
    type: [Number],
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

const eventModel = new mongoose.model("events", eventSchema);
module.exports = eventModel;
