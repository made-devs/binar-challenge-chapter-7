// router.js
const { application } = require("express");
const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router({ mergeParams: true });
// Controllers
const auth = require("../controllers/authController");
const restrict = require("../utils/restrict");
// Homepage
router.get("/login", (req, res) => res.render("login"));

// Register Page
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", auth.register);
router.post("/api/v1/auth/register", auth.register);

// Login page admin
router.get("/loginAdmin", restrict, (req, res) => {
  res.render("loginAdmin");
});
router.post("/loginAdmin", auth.login);

// Login page user
router.post("/api/v1/auth/login", auth.login);
router.post("/login", auth.loginUser);

// Dashboard
router.get("/dashboard", restrict, (req, res) => {
  res.render("dashboard");
});

// Data User
router.get("/dataUser", restrict, (req, res) => {
  res.render("dataUser");
});

// Game
router.get("/game", restrict, auth.game);

// End point untuk join dan membuat room baru
router.post("/game/join", restrict, require("../controllers/game/join"));

// End point untuk melakukan submit pilihan ketika di dalam room
router.post("/game/submit", restrict, require("../controllers/game/submit"));

// End point pengecekan hasil akhir pemenang
router.get(
  "/game/status/:roomCode",
  restrict,
  require("../controllers/game/status")
);

module.exports = router;
