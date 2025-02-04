const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

router.get("/:id", fileController.getFile, fileController.renderFile);
router.get("/delete/:id", fileController.deleteFile);

module.exports = router;
