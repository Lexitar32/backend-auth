const router = require("express").Router();
const { createSteps, getStep } = require("../controller/steps.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createSteps);
router.get("/get/:id/:stepId", [authorizeAccessToken], getStep);

module.exports = router;
