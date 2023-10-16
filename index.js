const express = require("express");
const multer = require("multer");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = require("./Routers/index");
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("", router);

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server running ....${port}`);
});
