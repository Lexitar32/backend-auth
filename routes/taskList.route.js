const router = require("express").Router();
const { createTaskList, getTaskList, getTask, updateTask } = require("../controller/taskList.controller");
const { verifyUser } = require("../middlewares/verifyUser");

router.post("/create", [verifyUser], createTaskList);
router.get("/get/:id", [verifyUser], getTaskList)
router.get("/get/:id/:taskId", [verifyUser], getTask)
router.post("/update/:id/:taskId", [verifyUser], updateTask)

module.exports = router;
 