const express = require("express");
const multer = require("multer");

const eventRouter = express.Router();

const { storage } = require("../Script/cloudinary");
const authMiddleware = require("../Middleware/authVerification");
const {
  getAllEvents,
  getEvent,
  addEvent,
  getCategory,
  deleteEvent,
  getEventsByUsers,
  editEvent,
} = require("../Controllers/eventsController");

const upload = multer({ storage });
eventRouter.get("/", getAllEvents);
eventRouter.get("/:eventId", getEvent);
eventRouter.post("/category", getCategory);
eventRouter.use(authMiddleware);
eventRouter.get("/my-events", getEventsByUsers);
eventRouter.post("/", upload.single("image"), addEvent);
eventRouter.delete("/:eventId", deleteEvent);
eventRouter.put("/:eventId", upload.single("image"), editEvent);

module.exports = eventRouter;
