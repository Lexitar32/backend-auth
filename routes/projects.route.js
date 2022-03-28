const router = require("express").Router();
const { createProject, getProjects, updateProject, deleteProject, getProject } = require("../controller/projects.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");
// const { checkPermissions } = require("../middlewares/checkPermissions");

router.post("/create", [authorizeAccessToken], createProject);
router.get("/get/:id", [authorizeAccessToken], getProjects);
router.get("/get/:id/:projectId", [authorizeAccessToken], getProject);
router.post("/update/:statusId/:projectId", [authorizeAccessToken], updateProject);
router.delete("/delete/:statusId/:projectId", [authorizeAccessToken], deleteProject);

module.exports = router;
