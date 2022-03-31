const Joi = require("joi");

exports.createTaskValidation = () => {
  const schema = Joi.object({
    taskListName: Joi.string()
      .required()
      .error(new Error("Task Name is required!")),
    projectId: Joi.string()
      .required()
      .error(new Error("Project Id is required")),
    status: Joi.boolean().required().error(new Error("Status is required")),
  });

  return schema;
};

exports.updateTaskValidation = () => {
  const schema = Joi.object({
    taskListName: Joi.string()
      .required()
      .error(new Error("Task Name is required!")),
    projectId: Joi.string()
      .required()
      .error(new Error("Project Id is required")),
    status: Joi.boolean().required().error(new Error("Status is required")),
  });

  return schema;
};
