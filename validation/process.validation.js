const Joi = require("joi");

exports.createProcessValidation = () => {
  const schema = Joi.object({
    processName: Joi.string()
      .required()
      .error(new Error("Process Name is required!")),
    description: Joi.optional(),
  });

  return schema;
};

exports.updateProcessValidation = () => {
  const schema = Joi.object({
    processName: Joi.string()
      .required()
      .error(new Error("Process Name is required!")),
    description: Joi.optional(),
  });

  return schema;
};
