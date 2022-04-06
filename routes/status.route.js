const router = require("express").Router();
const {
  createStatus,
  getStatus,
  updateStatus,
  deleteStatus
} = require("../controller/status.controller");
const { verifyUser } = require("../middlewares/verifyUser");

router.post("/create", [verifyUser], createStatus);
router.get("/get/:id", [verifyUser], getStatus);
router.post("/update/:id/:statusId", [verifyUser], updateStatus);
router.delete("/delete/:id/:statusId", [verifyUser], deleteStatus);

module.exports = router;
