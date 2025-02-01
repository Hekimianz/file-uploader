const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

router.get("/:id", fileController.getFile, fileController.renderFile);

module.exports = router;
