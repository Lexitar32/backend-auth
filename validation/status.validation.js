const Joi = require("joi");

exports.createStatusValidation = () => {
  const schema = Joi.object({
    statusName: Joi.string()
      .required()
      .error(new Error("Status Name is required!")),
    boardId: Joi.string().required().error(new Error("Board Id is required")),
  });

  return schema;
};

exports.updateStatusValidation = () => {
    const schema = Joi.object({
      statusName: Joi.string()
        .required()
        .error(new Error("Status Name is required!"))
    });
  
    return schema;
  };