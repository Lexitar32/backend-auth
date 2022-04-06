const router = require("express").Router();
const {
    createWorkSpace,
    getWorkspaces,
} = require("../controller/workspace.controller");
const {
    verifyUser
} = require("../middlewares/verifyUser");

router.post("/create", [verifyUser], createWorkSpace);
router.get("/get/:id", [verifyUser], getWorkspaces);

module.exports = router;
