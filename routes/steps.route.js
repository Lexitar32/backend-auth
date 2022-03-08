const router = require("express").Router();
const { createSteps, getStep, deleteStep } = require("../controller/steps.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createSteps);
router.get("/get/:id/:stepId", [authorizeAccessToken], getStep);
router.delete("/delete/:processId/:stepId", [authorizeAccessToken], deleteStep);

module.exports = router;
