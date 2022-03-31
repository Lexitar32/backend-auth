const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const textEditorSchema = new Schema(
  {
    stepDesc: {
      type: String,
    },
    stepId: {
      type: String,
    },
    taskId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

textEditorSchema.methods.toJSON = function () {
  const stepDesc = this;
  const textEditorObject = stepDesc.toObject();

  delete textEditorObject.__v;
  return textEditorObject;
};

const textEditor = mongoose.model("textEditor", textEditorSchema);

module.exports = textEditor;
