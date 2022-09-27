const { User } = require("../models");
const passport = require("passport");
function format(user) {
  const { id, username } = user;
  return {
    id,
    username,
    accessToken: user.generateToken(),
  };
}
module.exports = {
  register: (req, res, next) => {
    User.register(req.body)
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => next(err));
  },
  login: (req, res) => {
    User.authenticate(req.body).then((user) => {
      res.json(format(user));
    });
  },

  loginUser: passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  }),

  game: (req, res) => {
    res.render("game");
  },
};
