var jwtAuthz = require("express-jwt-authz");

const checkPermissions = jwtAuthz(["read:workspaces"], {
  customScopeKey: "permissions",
});

module.exports = { checkPermissions };
