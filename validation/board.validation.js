const Joi = require("joi");

exports.createBoardValidation = () => {
  const schema = Joi.object({
    boardTitle: Joi.string()
      .required()
      .error(new Error("Board Title is required!")),
    label: Joi.required()
    .error(new Error("Board Label is required!")),
    userId: Joi.string().required().error(new Error("User Id is required")),
    processName: Joi.optional()
  });

  return schema;
};