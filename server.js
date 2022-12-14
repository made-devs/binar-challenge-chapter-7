const express = require("express");
const app = express();
const path = require("path");

const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const { PORT = 8000 } = process.env;
const user = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use("/api", require("./routes/router"));

app.use(
  session({
    secret: "Buat ini jadi rahasia",
    resave: false,
    saveUninitialized: false,
  })
);

const passport = require("./utils/passport");
app.use(passport.initialize());
app.use(passport.session());

const passportJwt = require("./utils/passportJwt");
app.use(passportJwt.initialize());
app.use(flash());

app.set("view engine", "ejs");

const router = require("./routes/router");
app.use(router);
user.sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server nyala di port ${PORT}`);
    });
  })
  .catch(console.log);
