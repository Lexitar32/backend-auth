const router = require("express").Router();
const {
  createProcess,
  getProcesses,
  getProcess,
  updateProcess,
  deleteProcess,
} = require("../controller/process.controller");
const { verifyUser } = require("../middlewares/verifyUser");

router.post("/create", [verifyUser], createProcess);
router.get("/get/:id", [verifyUser], getProcesses);
router.get("/get/:id/:processId", [verifyUser], getProcess);
router.post("/update/:id/:processId", [verifyUser], updateProcess);
router.delete("/delete/:id/:processId", [verifyUser], deleteProcess);

module.exports = router;
