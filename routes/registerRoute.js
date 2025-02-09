const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");

router.get("/", registerController.render);

router.post("/", registerController.register);

module.exports = router;
