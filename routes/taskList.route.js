const router = require("express").Router();
const { createTaskList, getTaskList, getTask, updateTask } = require("../controller/taskList.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createTaskList);
router.get("/get/:id", [authorizeAccessToken], getTaskList)
router.get("/get/:id/:taskId", [authorizeAccessToken], getTask)
router.post("/update/:id/:taskId", [authorizeAccessToken], updateTask)

module.exports = router;
 