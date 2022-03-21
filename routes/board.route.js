const router = require("express").Router();
const { createBoard, getBoards } = require("../controller/boards.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createBoard);
router.get("/get/:id", [authorizeAccessToken], getBoards);

module.exports = router;
