var jwtAuthz = require("express-jwt-authz");

const checkPermissions = jwtAuthz(["read:processes"], {
  customScopeKey: "permissions",
});

module.exports = { checkPermissions };
