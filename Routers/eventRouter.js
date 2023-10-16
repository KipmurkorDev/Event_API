const express = require("express");
const multer = require("multer");

const authMiddleware = require("../Middleware/authVerification");
const {
  getAllEvents,
  addEvent,
  deleteEvent,
  editEvent,
} = require("../Controllers/eventsController");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const eventRouter = express.Router();

eventRouter.use(authMiddleware);
eventRouter.get("/", getAllEvents);
eventRouter.post("/", upload.single("profile-file"), addEvent);
eventRouter.delete("/:eventId", deleteEvent);
eventRouter.put("/:eventId", editEvent);

module.exports = eventRouter;
