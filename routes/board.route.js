const router = require("express").Router();
const { createBoard, getBoards, deleteBoard, updateBoard, getBoard } = require("../controller/boards.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createBoard);
router.get("/get/:id", [authorizeAccessToken], getBoards);
router.get("/get/:id/:boardId", [authorizeAccessToken], getBoard);
router.post("/update/:id/:boardId", [authorizeAccessToken], updateBoard)
router.delete("/delete/:id/:boardId", [authorizeAccessToken], deleteBoard)

module.exports = router;
