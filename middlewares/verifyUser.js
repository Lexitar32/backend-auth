// module.exports = verifyUser;
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authorizeAccessToken = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://scalemath.eu.auth0.com/.well-known/jwks.json`,
    }),
    audience: "https://api.workover.io/",
    issuer: `https://scalemath.eu.auth0.com/`,
    algorithms: ["RS256"],
});

module.exports = { authorizeAccessToken };
