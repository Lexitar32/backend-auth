const router = require("express").Router();
const { createProject, getProjects, updateProject, deleteProject, getProject } = require("../controller/projects.controller");
const { verifyUser } = require("../middlewares/verifyUser");

router.post("/create", [verifyUser], createProject);
router.get("/get/:id", [verifyUser], getProjects);
router.get("/get/:id/:projectId", [verifyUser], getProject);
router.post("/update/:statusId/:projectId", [verifyUser], updateProject);
router.delete("/delete/:statusId/:projectId", [verifyUser], deleteProject);

module.exports = router;
