const { body, validationResult } = require("express-validator");
const passport = require("passport");

const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .normalizeEmail()
    .escape(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .escape(),
];

exports.login = [
  ...validateLogin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("login", { errors: errors.array() });
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
];
