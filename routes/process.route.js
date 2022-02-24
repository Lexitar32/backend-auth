const router = require("express").Router();
const {
    createProcess,
    getProcesses,
} = require("../controller/process.controller");
const {
    authorizeAccessToken
} = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createProcess);
router.get("/get/:id", [authorizeAccessToken], getProcesses);

module.exports = router;
