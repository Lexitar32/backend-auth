const statusModel = require("../models/status.model");
const {
  createStatusValidation,
  updateStatusValidation,
} = require("../validation/status.validation");

exports.createStatus = async (req, res) => {
  try {
    const data = {};
    const { statusName, userId } = req.body;

    data.statusName = statusName;
    data.userId = userId;

    const { error } = createStatusValidation().validate(data);

    if (error) {
      return res.status(400).send({
        error: error.message,
      });
    }

    const existingStatus = await statusModel.findOne({
      statusName,
      userId,
    });

    if (existingStatus) {
      throw new Error(" Status Already Exists");
    }

    const status = new statusModel(data);
    await status.save();

    res.send({
      message: "Status successfully created",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const status = await statusModel
      .find({ userId: req.params.id })
      .populate("projects");
    res.send(status);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const data = {};
    const { statusName } = req.body;

    data.statusName = statusName;

    const { error } = updateStatusValidation().validate(data);

    if (error) {
      return res.send(error.message);
    }

    const existingStatus = await statusModel.findOne({
      statusName: data.statusName,
    });

    if (existingStatus) {
      throw new Error("Status Already Exists");
    }

    let response = await statusModel.findOneAndUpdate(
      { _id: req.params.statusId, userId: req.params.id },
      data
    );

    if (!response) {
      throw new Error("Status not found");
    }

    res.send({
      message: "Status successfully updated",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.deleteStatus = async (req, res) => {
  try {
    let response = await statusModel.findOneAndDelete({
      _id: req.params.statusId,
      userId: req.params.id,
    });

    if (!response) {
      throw new Error("Status not found");
    }

    res.send({
        message: "Status successfully deleted",
      });
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};
