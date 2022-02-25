const Joi = require("joi");

exports.createProcessValidation = () => {
    const schema = Joi.object({
        processName: Joi.string()
            .required()
            .error(new Error("Process Name is required!")),
        description: Joi.string()
            .min(20)
            .max(100)
            .required()
            .error(
                new Error(
                    "Process Description should be min of 20 characters and max of 100 characters"
                )
            ),
        userId: Joi.string().required().error(new Error("User Id is required")),
    });

    return schema;
};

exports.updateProcessValidation = () => {
    const schema = Joi.object({
        processName: Joi.string()
            .required()
            .error(new Error("Process Name is required!")),
        description: Joi.string()
            .min(20)
            .max(100)
            .required()
            .error(
                new Error(
                    "Process Description should be min of 20 characters and max of 100 characters"
                )
            ),
    });

    return schema;
};
