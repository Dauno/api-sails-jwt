var jwt = require('jsonwebtoken');

module.exports.issueToken = function(payload) {
  return jwt.sign(
    payload,
    process.env.TOKEN_SECRET || "oursecret",
    {
      expiresInMinutes: 1440
    }
  );
};

module.exports.verifyToken = function(token, verified) {
  return jwt.verify(
    token,
    process.env.TOKEN_SECRET || "oursecret",
    {},
    verified
  );
};
