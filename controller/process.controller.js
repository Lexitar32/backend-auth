const ProcessModel = require("../models/process.model");

exports.createProcess = async (req, res) => {
    try {
        const data = {};
        const { processName, description, userId } = req.body;

        data.processName = processName;
        data.userId = userId;
        data.description = description;

        const existingProcess = await ProcessModel.findOne({
            processName,
            userId
        });

        if (existingProcess) {
            throw new Error(" Process Already Exists");
        }

        const process = new ProcessModel(data);
        await process.save();
        res.send({
            message: "Process successfully created",
        });
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};

exports.getProcesses = async (req, res) => {
    try {
        const processes = await ProcessModel.find({ userId: req.params.id });
        res.send(processes);
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};
