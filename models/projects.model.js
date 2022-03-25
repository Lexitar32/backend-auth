const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        projectName: {
            type: String,
            required: true,
        },
        statusId: {
            type: String,
            required: true,
        },
        boardId: {
            type: String,
            required: true
        },
        taskList: [{ type: Schema.Types.ObjectId, ref: "taskList" }],
    },
    {
        timestamps: true,
    }
);

projectSchema.methods.toJSON = function () {
    const projects = this;
    const projectsObject = projects.toObject();

    delete projectsObject.__v;
    return projectsObject;
};

const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
