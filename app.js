require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./config/passport");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);
app.use("/sign-up", (req, res) =>
  req.user ? res.render("home") : res.render("signup")
);
app.use("/", (req, res) =>
  req.user ? res.render("home") : res.render("login")
);

app.listen(PORT, () => console.log(`Server is up at port ${PORT}`));
