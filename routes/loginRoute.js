const express = require("express");
const passport = require("passport");
const router = express.Router();
const { body, validationResut } = require("express-validator");
const loginController = require("../controllers/loginController");

router.get("/", (req, res) => res.render("login"));

router.post("/", loginController.login);

module.exports = router;
