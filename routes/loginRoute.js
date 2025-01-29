const express = require("express");
const passport = require("passport");
const router = express.Router();
const { body, validationResut } = require("express-validator");

router.get("/", (req, res) => res.render("login"));

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
