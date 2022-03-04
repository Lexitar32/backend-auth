const Step = require("../models/steps.model");
const textEditorModel = require("../models/textEditor.model");

exports.createStepDesc = async (req, res) => {
    try {
        const data = {};
        const { stepDesc, stepId } = req.body;

        data.stepDesc = stepDesc;
        data.stepId = stepId;

        const textEditor = new textEditorModel(data);
        await textEditor.save();
        await Step.findOneAndUpdate(
            { _id: data.stepId },
            { $push: { stepDesc: textEditor._id } },
            { new: true }
        );
        res.send({
            message: "Step Description Sucessfully Saved",
        });
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};
