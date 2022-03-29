const router = require("express").Router();
const { createTaskList, getTaskList } = require("../controller/taskList.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");

router.post("/create", [authorizeAccessToken], createTaskList);
router.get("/get/:id", [authorizeAccessToken], getTaskList)

module.exports = router;
 