require("dotenv").config();
require("../config");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const { workSpaceRouter } = require("../routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// Routes
app.use("/api/workspace", workSpaceRouter);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

app.use((req, res, next) => {
  res.send("Route does not exist");
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
