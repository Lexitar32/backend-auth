const Project = require("../models/projects.model");
const taskList = require("../models/taskList.model");
const { createTaskValidation } = require("../validation/taskList.validation");

exports.createTaskList = async (req, res) => {
  try {
    const data = {};
    const { taskListName, projectId } = req.body;

    data.taskListName = taskListName;
    data.projectId = projectId;

    const { error } = createTaskValidation().validate(data);

    if (error) {
      return res.status(400).send({
        error: error.message,
      });
    }

    const task = new taskList(data);
    await task.save();

    await Project.findOneAndUpdate(
      { _id: data.projectId },
      { $push: { taskList: task._id } },
      { new: true }
    );
    res.send({
      message: "Task successfully created",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.getTaskList = async (req, res) => {
  try {
    const tasks = await taskList.find({
      projectId: req.params.id
    }).populate("stepDesc");
    res.send(tasks);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};
