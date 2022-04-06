const router = require("express").Router();
const { createBoard, getBoards, deleteBoard, updateBoard, getBoard } = require("../controller/boards.controller");
const { verifyUser } = require("../middlewares/verifyUser");

router.post("/create", [verifyUser], createBoard);
router.get("/get/:id", [verifyUser], getBoards);
router.get("/get/:id/:boardId", [verifyUser], getBoard);
router.post("/update/:id/:boardId", [verifyUser], updateBoard)
router.delete("/delete/:id/:boardId", [verifyUser], deleteBoard)

module.exports = router;
