const { modelName } = require("../Model/userModel");

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new event
const addEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const event = new Event({ title, date, description });
    const savedEvent = await event.save();
    res.json({ message: "Event added with _id: " + savedEvent._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    await Event.findByIdAndRemove(eventId);
    res.json({ message: "Event deleted with _id: " + eventId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit an event
const editEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { title, date, description } = req.body;
    await Event.findByIdAndUpdate(eventId, { title, date, description });
    res.json({ message: "Event edited with _id: " + eventId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEvents,
  addEvent,
  deleteEvent,
  editEvent,
};
