const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.getFolders, homeController.getHome);

router.post("/", homeController.addFolder);

module.exports = router;
