const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveySchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    firstProcess: {
      type: String,
      required: true,
    },
    business: {
      type: String,
      required: true,
    },
    hearAboutUs: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

surveySchema.methods.toJSON = function () {
  const survey = this;
  const surveyObject = survey.toObject();

  delete surveyObject.__v;
  return surveyObject;
};

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
