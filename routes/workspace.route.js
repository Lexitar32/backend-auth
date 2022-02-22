const router = require("express").Router();
const {
    createWorkSpace,
    getWorkspaces,
} = require("../controller/workspace.controller");
const {
    authorizeAccessToken
} = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createWorkSpace);
router.get("/get/:id", [authorizeAccessToken], getWorkspaces);

module.exports = router;
