const router = require("express").Router();
const { createStepDesc } = require("../controller/textEditor.controller");
const { verifyUser } = require("../middlewares/verifyUser");

router.post("/create", [verifyUser], createStepDesc);

module.exports = router;
