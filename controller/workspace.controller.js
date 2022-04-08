const WorkSpaceModel = require("../models/workspace.model");

exports.createWorkSpace = async (req, res) => {
    try {
        const data = {};
        const { name, description, image, shortName, userId } = req.body;

        data.name = name;
        data.userId = userId;
        data.shortName = shortName;
        data.description = description;
        if (image) data.image = image;

        const existingWorkspace = await WorkSpaceModel.findOne({
            name,
            userId
        });

        if (existingWorkspace) {
            throw new Error(" Workspace Already Exists");
        }

        const workspace = new WorkSpaceModel(data);
        await workspace.save();
        res.send({
            message: "Workspace successfully created",
        });
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};

exports.getWorkspaces = async (req, res) => {
    try {
        const workspaces = await WorkSpaceModel.find({ userId: req.id });
        res.send(workspaces);
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};
