const express = require("express");
const authMiddleware = require("../Middleware/authVerification");
const {
  getAllEvents,
  addEvent,
  deleteEvent,
  editEvent,
} = require("../Controllers/eventsController");

const eventRouter = express.Router();

eventRouter.use(authMiddleware);
eventRouter.get("/", getAllEvents);
eventRouter.post("/", addEvent);
eventRouter.delete("/:eventId", deleteEvent);
eventRouter.put("/:eventId", editEvent);

module.exports = eventRouter;
