const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskListSchema = new Schema(
  {
    taskListName: {
      type: String,
    },
    projectId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

taskListSchema.methods.toJSON = function () {
  const taskList = this;
  const taskListObject = taskList.toObject();

  delete taskListObject.__v;
  return taskListObject;
};

const taskList = mongoose.model("taskList", taskListSchema);

module.exports = taskList;
