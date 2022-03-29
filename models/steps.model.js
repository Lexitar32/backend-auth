const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stepsSchema = new Schema(
  {
    stepName: {
      type: String,
      required: true,
    },
    processId: {
      type: String,
      required: true,
    },
    stepDesc: [{ type: Schema.Types.ObjectId, ref: "textEditor" }],
  },
  {
    timestamps: true,
  }
);

stepsSchema.methods.toJSON = function () {
  const steps = this;
  const stepsObject = steps.toObject();

  delete stepsObject.__v;
  return stepsObject;
};

const Steps = mongoose.model("Step", stepsSchema);

module.exports = Steps;
