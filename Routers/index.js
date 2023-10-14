const authorRouter = require("./userRouter");

const eventRouter = require("./eventRouter");
const express = require("express");
const router = express.Router();

router.use("/users", authorRouter);
router.use("/events", eventRouter);

module.exports = router;
