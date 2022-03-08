const router = require("express").Router();
const { createSteps, getStep, deleteStep, updateStep } = require("../controller/steps.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createSteps);
router.get("/get/:id/:stepId", [authorizeAccessToken], getStep);
router.post("/update/:processId/:stepId", [authorizeAccessToken], updateStep);
router.delete("/delete/:processId/:stepId", [authorizeAccessToken], deleteStep);

module.exports = router;
