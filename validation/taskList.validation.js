const Joi = require("joi");

exports.createTaskValidation = () => {
    const schema = Joi.object({
        taskListName: Joi.string()
            .required()
            .error(new Error("Task Name is required!")),
        projectId: Joi.string().required().error(new Error("Project Id is required")),
    });

    return schema;
};
