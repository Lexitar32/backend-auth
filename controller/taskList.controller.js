const Project = require("../models/projects.model");
const taskList = require("../models/taskList.model");
const { createTaskValidation, updateTaskValidation } = require("../validation/taskList.validation");

exports.createTaskList = async (req, res) => {
  try {
    const data = {};
    const { taskListName, projectId, status } = req.body;

    data.taskListName = taskListName;
    data.projectId = projectId;
    data.status = status;

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
    const tasks = await taskList
      .find({
        projectId: req.params.id,
      })
      .populate("stepDesc");
    res.send(tasks);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await taskList
      .findOne({
        projectId: req.params.id,
        _id: req.params.taskId,
      })
      .populate("stepDesc");
    res.send(task);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
      const data = {};
      const { taskListName, projectId, status } = req.body;

    data.taskListName = taskListName;
    data.projectId = projectId;
    data.status = status;

    const { error } = updateTaskValidation().validate(data);

      if (error) {
          return res.send(error.message);
      }

      let response = await taskList.findOneAndUpdate(
          { _id: req.params.taskId, projectId: req.params.id },
          data
      );

      if (!response) {
          throw new Error("Task is not found");
      }

      res.send({
          message: "Task successfully updated",
      });
  } catch (error) {
      res.status(400).send({
          error: error.message || "Something went wrong",
      });
  }
};