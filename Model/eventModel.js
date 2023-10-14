const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
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
