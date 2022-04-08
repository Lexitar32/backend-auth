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
router.get("/get", [verifyUser], getProcesses);
router.get("/get/:processId", [verifyUser], getProcess);
router.post("/update/:processId", [verifyUser], updateProcess);
router.delete("/delete/:processId", [verifyUser], deleteProcess);

module.exports = router;
