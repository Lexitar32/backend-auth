const router = require("express").Router();

const {
  registerUser,
  loginUser,
  getNewAccessToken,
  logoutUser,
  emailVerification,
} = require("../controller/auth.controller");

router.post("/register", registerUser);
router.get("/confirm-email", emailVerification);
router.post("/login", loginUser);
router.get("/refreshtoken", getNewAccessToken);
router.delete("/logout", logoutUser);

module.exports = router;
