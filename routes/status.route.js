const router = require("express").Router();
const {
  createStatus,
  getStatus,
  updateStatus,
  deleteStatus
} = require("../controller/status.controller");
const { authorizeAccessToken } = require("../middlewares/verifyUser");
// const { checkPermissions } = require("../middlewares/checkPermissions");

router.post("/create", [authorizeAccessToken], createStatus);
router.get("/get/:id", [authorizeAccessToken], getStatus);
router.post("/update/:id/:statusId", [authorizeAccessToken], updateStatus);
router.delete("/delete/:id/:statusId", [authorizeAccessToken], deleteStatus);

module.exports = router;
