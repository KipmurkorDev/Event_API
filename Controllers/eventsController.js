const eventModel = require("../Model/eventModel");
const mongoose = require("mongoose");
// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find({});
    return res.status(200).json({
      status: "success",
      message: "All events retrieved",
      data: events,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// Add a new event
const addEvent = async (req, res) => {
  try {
    const { eventName, category, location, dateTime } = req.body;
    const errors = [];

    if (!eventName) {
      errors.push("Event Name is required.");
    }

    if (!category) {
      errors.push("Category is required.");
    }

    if (!location) {
      errors.push("Location is required.");
    }

    if (!dateTime) {
      errors.push("Date and Time is required.");
    }

    if (errors.length > 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Validation failed", errors });
    }

    const event = new eventModel({ eventName, category, location, dateTime });
    const savedEvent = await event.save();
    res
      .status(201)
      .json({ status: "success", message: "Event added", data: savedEvent });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Check if the event ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid event ID.",
      });
    }

    // Check if the event with the provided ID exists
    const event = await eventModel.findOne({ _id: eventId });
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found.",
      });
    }

    // If the event exists, delete it
    await eventModel.deleteOne({ _id: eventId });
    return res.status(200).json({
      status: "success",
      message: "Event deleted",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// Edit an event
const editEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Check if the event ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid event ID.",
      });
    }

    const { eventName, category, location, dateTime } = req.body;

    // Check if at least one field is provided
    if (!eventName && !category && !location && !dateTime) {
      return res.status(400).json({
        status: "error",
        message:
          "At least one field of data (eventName, category, location, dateTime) is required.",
      });
    }

    const event = await eventModel.findOne({ _id: eventId });

    if (!event) {
      return res
        .status(404)
        .json({ status: "error", message: "The event does not exist" });
    }

    const updateEvent = await eventModel.updateOne(
      { _id: eventId },
      {
        $set: {
          eventName,
          category,
          location,
          dateTime,
        },
      }
    );

    return res
      .status(200)
      .json({ status: "success", message: "Event edited", data: updateEvent });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  getAllEvents,
  addEvent,
  deleteEvent,
  editEvent,
};
