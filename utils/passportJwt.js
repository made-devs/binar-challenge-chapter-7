const passportJwt = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");

/* Passport JWT Options */
const options = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: "Ini rahasia ga boleh disebar-sebar",
};
passportJwt.use(
  new JwtStrategy(options, async (payload, done) => {
    User.findByPk(payload.id)
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);

module.exports = passportJwt;
