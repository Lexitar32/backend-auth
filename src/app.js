require("dotenv").config();
require("../config");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const {
  surveyRouter,
  authRouter,
  workSpaceRouter,
  processRouter,
  stepsRouter,
  stepDescRouter,
  boardRouter,
  statusRouter,
  projectsRouter,
  taskListRouter,
} = require("../routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.static("public"));
app.use(cors({ origin: ["http://localhost:3000", "http://app.workover.io"], credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// Routes
app.use("/api/survey", surveyRouter);
app.use("/api/auth", authRouter);
app.use("/api/workspace", workSpaceRouter);
app.use("/api/process", processRouter);
app.use("/api/steps", stepsRouter);
app.use("/api/stepDesc", stepDescRouter);
app.use("/api/board", boardRouter);
app.use("/api/status", statusRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/tasks", taskListRouter);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});

app.use((req, res, next) => {
  res.status(400).send("Route does not exist");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
