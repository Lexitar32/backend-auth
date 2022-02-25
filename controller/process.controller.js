const ProcessModel = require("../models/process.model");
const {
    createProcessValidation,
    updateProcessValidation,
} = require("../validation/process.validation");

exports.createProcess = async (req, res) => {
    try {
        const data = {};
        const { processName, description, userId } = req.body;

        data.processName = processName;
        data.userId = userId;
        data.description = description;

        const { error } = createProcessValidation().validate(data);

        if (error) {
            return res.status(400).send({
                error: error.message
            });
        }

        const existingProcess = await ProcessModel.findOne({
            processName,
            userId,
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

exports.getProcess = async (req, res) => {
    try {
        const process = await ProcessModel.findOne({
            userId: req.params.id,
            id: req.params.processId,
        });
        res.send(process);
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};

exports.updateProcess = async (req, res) => {
    try {
        const data = {};
        const { processName, description } = req.body;

        data.processName = processName;
        data.description = description;

        const { error } = updateProcessValidation().validate(data);

        if (error) {
            return res.send(error.message);
        }

        let response = await ProcessModel.findOneAndUpdate(
            { userId: req.params.id, id: req.params.processId },
            data
        );

        if (!response) {
            throw new Error("Process not found");
        }

        res.send({
            message: "Process successfully updated",
        });
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};

exports.deleteProcess = async (req, res) => {
    try {
        let response = await ProcessModel.findOneAndDelete({
            userId: req.params.id,
            id: req.params.processId,
        });

        if (!response) {
            throw new Error("Process not found");
        }

        res.send({
            message: "Process deleted successfully",
        });
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};
