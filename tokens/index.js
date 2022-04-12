const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const createAccessToken = (user) => {
  const payload = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

const createRefreshToken = (user) => {
  const payload = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  };

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });
};

const sendAccessToken = (res, token, user) => {
  res.send({
    token,
    user
  });
};

const sendRereshToken = (res, token) => {
  res.cookie("refreshToken", token, {
    path: "/api/auth/refreshtoken",
    httpOnly: true,
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRereshToken,
};
