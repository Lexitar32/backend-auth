const surveyRouter = require("./survey.route")
const authRouter = require("./auth.route")
const workSpaceRouter = require("./workspace.route");
const processRouter = require("./process.route");
const stepsRouter = require("./steps.route");
const stepDescRouter = require("./textEditor.route");
const boardRouter = require("./board.route");
const statusRouter = require("./status.route");
const projectsRouter = require("./projects.route");
const taskListRouter = require("./taskList.route");

module.exports = {
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
};
