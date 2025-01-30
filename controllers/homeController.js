const prisma = require("../config/prisma");

exports.getHome = async (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home", { user: req.user });
  } else {
    res.redirect("/login");
  }
};

exports.getFolders = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const folders = await prisma.folder.findMany({
        where: { userId: req.user.id },
      });
      req.user.folders = folders;
      console.log(req.user);
    }
    next();
  } catch (err) {
    console.error("Error fetchig folders", err);
  }
};

exports.addFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const newFolder = await prisma.folder.create({
      data: {
        name: name,
        userId: req.user.id,
      },
    });
    res.redirect("/");
    console.log(newFolder);
  } catch (err) {
    console.error("error creating new folder", err);
  }
};
