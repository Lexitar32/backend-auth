const SurveyModel = require("../models/survey.model");
const { surveyValidation } = require("../validation/survey.validation");

exports.createSurvey = async (req, res) => {
  try {
    const data = {};
    const { email, goal, firstProcess, business, hearAboutUs } = req.body;

    data.email = email;
    data.goal = goal;
    data.firstProcess = firstProcess;
    data.business = business;
    data.hearAboutUs = hearAboutUs;

    const { error } = surveyValidation().validate(data);

    if (error) {
      return res.status(400).send({
        error: error.message,
      });
    }

    const survey = new SurveyModel(data);
    await survey.save();
    res.send({
      message: "Thanks for filling the survey, kindly check your mail to know more about Workover!",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};
