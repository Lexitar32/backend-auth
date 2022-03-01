const router = require("express").Router();
const { createSteps } = require("../controller/steps.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createSteps);

module.exports = router;
