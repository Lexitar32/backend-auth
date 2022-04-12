const router = require("express").Router();

const {
  registerUser,
  loginUser,
  getNewAccessToken,
  logoutUser,
  emailVerification,
  updateUserProfile,
  getUserDetails
} = require("../controller/auth.controller");
const { verifyUser } = require("../middlewares/verifyUser");

router.post("/register",  registerUser);
router.get("/confirm-email", emailVerification);
router.post("/login", loginUser);
router.get("/refreshtoken", getNewAccessToken);
router.delete("/logout", logoutUser);
router.post("/updateProfile", [verifyUser], updateUserProfile)
router.get("/getUser", [verifyUser], getUserDetails)

module.exports = router;
