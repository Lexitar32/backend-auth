const Process = require("../models/process.model");
const Steps = require("../models/steps.model");
const { createStepsValidation } = require("../validation/steps.validation");

exports.createSteps = async (req, res) => {
    try {
        const data = {};
        const { stepName, processId } = req.body;

        data.stepName = stepName;
        data.processId = processId;

        const { error } = createStepsValidation().validate(data);

        if (error) {
            return res.status(400).send({
                error: error.message,
            });
        }

        const step = new Steps(data);
        await step.save();
        await Process.findOneAndUpdate(
            { _id: data.processId },
            { $push: { steps: step._id } },
            { new: true }
        );
        res.send({
            message: "Step successfully created",
        });
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};

exports.getStep = async (req, res) => {
    try {
        const stepDesc = await Steps.findOne({
            processId: req.params.id,
            _id: req.params.stepId,
        }).populate("stepDesc")
        res.send(stepDesc);
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};

exports.updateProcess = async (req, res) => {
    try {
        const data = {};
        const { stepName, processId } = req.body;

        data.stepName = stepName;
        data.processId = processId;

        const { error } = createStepsValidation().validate(data);

        if (error) {
            return res.send(error.message);
        }

        let response = await Steps.findOneAndUpdate(
            { _id: req.params.stepId, processId: req.params.processId },
            data
        );

        if (!response) {
            throw new Error("Step not found");
        }

        res.send({
            message: "Step successfully updated",
        });
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};

exports.deleteStep = async (req, res) => {
    try {
        let response = await Steps.findOneAndDelete({
            _id: req.params.stepId,
            processId: req.params.processId,
        });

        if (!response) {
            throw new Error("Step not found");
        }

        res.send({
            message: "Step deleted successfully",
        });
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
}

