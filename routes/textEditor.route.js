const router = require("express").Router();
const { createStepDesc } = require("../controller/textEditor.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createStepDesc);

module.exports = router;
