const router = require("express").Router();
const { createBoard, getBoards, deleteBoard, updateBoard, getBoard } = require("../controller/boards.controller");
const { verifyUser } = require("../middlewares/verifyUser");

router.post("/create", [verifyUser], createBoard);
router.get("/get", [verifyUser], getBoards);
router.get("/get/:boardId", [verifyUser], getBoard);
router.post("/update/:boardId", [verifyUser], updateBoard)
router.delete("/delete/:boardId", [verifyUser], deleteBoard)

module.exports = router;
