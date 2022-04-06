const router = require("express").Router();
const { createSteps, getStep, deleteStep, updateStep } = require("../controller/steps.controller");
const { verifyUser } = require("../middlewares/verifyUser");

router.post("/create", [verifyUser], createSteps);
router.get("/get/:id/:stepId", [verifyUser], getStep);
router.post("/update/:processId/:stepId", [verifyUser], updateStep);
router.delete("/delete/:processId/:stepId", [verifyUser], deleteStep);

module.exports = router;
