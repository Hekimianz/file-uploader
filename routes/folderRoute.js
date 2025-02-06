const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const folderController = require("../controllers/folderController");
const { ensureAuthenticated } = require("../middlewares/auth");

router.get("/delete/:id", folderController.deleteFiles);
router.get(
  "/:id/:name",
  ensureAuthenticated,
  folderController.getFolder,
  folderController.getFolderFiles,
  folderController.renderFolder
);

router.post(
  "/:id/:name",
  ensureAuthenticated,
  upload.single("file"),
  folderController.uploadFile
);

module.exports = router;
