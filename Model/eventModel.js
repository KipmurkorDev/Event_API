const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  envetName: {
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
    type: "Point",
    coordinates: [12.9716, 77.5946],
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

const eventModel = new mongoose.model("events", eventSchema);
module.exports = eventModel;
