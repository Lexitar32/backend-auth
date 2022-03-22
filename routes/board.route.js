const router = require("express").Router();
const { createBoard, getBoards, deleteBoard, updateBoard } = require("../controller/boards.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createBoard);
router.get("/get/:id", [authorizeAccessToken], getBoards);
router.post("/update/:id/:boardId", [authorizeAccessToken], updateBoard)
router.delete("/delete/:id/:boardId", [authorizeAccessToken], deleteBoard)

module.exports = router;
