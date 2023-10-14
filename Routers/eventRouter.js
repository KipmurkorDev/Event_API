const express = require("express");
const {
  getAllEvents,
  addEvent,
  deleteEvent,
  editEvent,
} = require("../Controllers/eventsController");

const eventRouter = express.Router();

eventRouter.get("/api/events", getAllEvents);
eventRouter.post("/api/events", addEvent);
eventRouter.delete("/api/events/:eventId", deleteEvent);
eventRouter.put("/api/events/:eventId", editEvent);

module.exports = eventRouter;
