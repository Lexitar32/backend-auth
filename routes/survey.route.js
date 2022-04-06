const router = require("express").Router();
const { createSurvey } = require("../controller/survey.controller");

router.post("/create", createSurvey);

module.exports = router;
