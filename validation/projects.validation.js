const Joi = require("joi");

exports.createProjectValidation = () => {
  const schema = Joi.object({
    projectName: Joi.string()
      .required()
      .error(new Error("Project Name is required!")),
    statusId: Joi.string().required().error(new Error("Status Id is required")),
    boardId: Joi.string().required().error(new Error("Board Id is required")),
  });

  return schema;
};

exports.updateProjectValidation = () => {
  const schema = Joi.object({
    projectName: Joi.string()
      .required()
      .error(new Error("Project Name is required!"))
  });

  return schema;
};
