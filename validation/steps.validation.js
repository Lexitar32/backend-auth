const Joi = require("joi");

exports.createStepsValidation = () => {
    const schema = Joi.object({
        stepName: Joi.string()
            .required()
            .error(new Error("Step Name is required!")),
        processId: Joi.string().required().error(new Error("Process is required")),
    });

    return schema;
};
