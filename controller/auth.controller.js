const User = require("../models/user.model");
const { emailVerification } = require("../utils/mailer");
const { hash, compare } = require("bcrypt");
const {
  createAccessToken,
  createRefreshToken,
  sendRereshToken,
  sendAccessToken,
} = require("../tokens");
const { verify } = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await User.findOne({ email });
    if (response) throw new Error("User with the mail exists");

    const hashedPassword = await hash(password, 8);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    emailVerification(user);

    res.status(201).send({
      message: "Registration successful, check your mail",
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
  }
};

exports.emailVerification = async (req, res) => {
  try {
    const token = req.query.token;
    console.log(token);

    if (!token) return res.redirect("/");

    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    const response = await User.findOneAndUpdate(
      { email: payload.email },
      { isActive: true }
    );

    if (!response) throw new Error("This user is not registered");
    res.redirect(process.env.LOGIN_REDIRECT);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("Invalid email / password");

    const isPassword = await compare(password, user.password);
    if (!isPassword) throw new Error("Invalid email / password");
    if (!user.isActive) throw new Error("Email Confirmation needed");
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    sendRereshToken(res, refreshToken);
    sendAccessToken(res, accessToken);
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
};

exports.getNewAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) throw new Error();

    const payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.id);
    if (!user) throw new Error();

    if (user.refreshToken !== token) throw new Error();

    const newAccessToken = createAccessToken(user);

    sendAccessToken(res, newAccessToken);
  } catch (err) {
    res.status(400).send({
      token: "",
    });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    path: "/api/auth/refreshtoken",
  });
  res.send({
    message: "Logout Success",
  });
};

exports.updateUserProfile = async (req, res) => {
  try {
      const data = {};
      const { fullName, companyName, profilePicture, timeZone } = req.body;

      data.fullName= fullName;
      data.companyName = companyName;
      data.profilePicture = profilePicture;
      data.timeZone = timeZone

      console.log(req.id)

      const response = await User.findOneAndUpdate(
        {_id: req.id},
        data
      );

      if (!response) {
          throw new Error("User does not exist");
      }

      res.send({
          message: "User details successfully updated",
      });
  } catch (error) {
      res.status(400).send({
          error: error.message || "Something went wrong",
      });
  }
};