const { verify } = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const authorization = req.headers["authorization"];

  try {
    if (!authorization) throw new Error();
    const token = authorization.split(" ")[1];

    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.id = decoded.id;
    next();
  } catch (err) {
    res.status(400).send({
      error: "Not Authorized" || err.message,
    });
  }
};

module.exports = { verifyUser };
