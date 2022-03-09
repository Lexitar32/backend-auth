const router = require("express").Router();
const {
  createProcess,
  getProcesses,
  getProcess,
  updateProcess,
  deleteProcess,
} = require("../controller/process.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");
const { checkPermissions } = require("../middlewares/checkPermissions");

router.post("/create", [authorizeAccessToken], createProcess);
router.get("/get/:id", [authorizeAccessToken, checkPermissions], getProcesses);
router.get("/get/:id/:processId", [authorizeAccessToken], getProcess);
router.post("/update/:id/:processId", [authorizeAccessToken], updateProcess);
router.delete("/delete/:id/:processId", [authorizeAccessToken], deleteProcess);

module.exports = router;
