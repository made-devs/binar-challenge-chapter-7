// router.js
const { application } = require("express");
const express = require("express");
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
router.get("/loginAdmin", (req, res) => {
  res.render("loginAdmin");
});
router.post("/loginAdmin", auth.loginAdmin);

// Login page user
router.post("/api/v1/auth/login", auth.login);
router.post("/login", auth.login);

router.get("/whoami", auth.whoami);

// Dashboard
router.get("/dashboard", auth.dashboard);

// End point untuk join dan membuat room baru
router.post("/game/join", require("../controllers/game/join"));

// End point untuk melakukan submit pilihan ketika di dalam room
router.post("/game/submit", require("../controllers/game/submit"));

// End point pengecekan hasil akhir pemenang
router.get("/game/status/:roomCode", require("../controllers/game/status"));

module.exports = router;
