const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const folderController = require("../controllers/folderController");

router.get("/:id/:name", folderController.renderFolder);

router.post("/:id/:name", upload.single("file"), folderController.uploadFile);

module.exports = router;
