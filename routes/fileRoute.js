const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const { ensureAuthenticated } = require("../middlewares/auth");

router.get(
  "/:id",
  ensureAuthenticated,
  fileController.getFile,
  fileController.renderFile
);
router.get("/share/:id", fileController.getSharedFile);
router.get("/delete/:id", ensureAuthenticated, fileController.deleteFile);

module.exports = router;
