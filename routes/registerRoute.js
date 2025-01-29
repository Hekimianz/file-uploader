const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");

router.get("/", (req, res) => res.render("signup"));

router.post("/", registerController.register);

module.exports = router;
