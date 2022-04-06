const Joi = require("joi");

exports.surveyValidation = () => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .error(new Error("Email Address is required!")),
    goal: Joi.string()
      .required()
      .error(new Error("Goal is required!")),
    firstProcess: Joi.string()
      .required()
      .error(new Error("Add your first Process")),
    business: Joi.string()
      .required()
      .error(new Error("Business is required!")),
    hearAboutUs: Joi.string()
      .required()
      .error(new Error("Where did you hear about us?")),
  });

  return schema;
};
