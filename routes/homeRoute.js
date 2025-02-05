const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const { ensureAuthenticated } = require("../middlewares/auth");

router.get(
  "/",
  ensureAuthenticated,
  homeController.getFolders,
  homeController.getHome
);

router.post("/", ensureAuthenticated, homeController.addFolder);

module.exports = router;
