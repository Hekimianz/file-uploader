const prisma = require("../config/prisma");
const { format } = require("date-fns");
const cloudinary = require("../config/cloudinary");

exports.getFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await prisma.file.findUnique({
      where: { id: id },
    });
    const user = await prisma.user.findUnique({
      where: { id: file.userId },
    });
    req.file = file;
    req.file.dateFormatted = format(
      new Date(req.file.createdAt),
      "dd MMM, yyyy HH:mm"
    );
    req.file.user = user.name;
    next();
  } catch (err) {
    console.error("Error fetching file", err);
  }
};

exports.renderFile = async (req, res) => {
  try {
    res.render("file", { file: req.file });
  } catch (err) {
    console.error("Error rendering file", err);
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const id = req.params.id;
    const file = await prisma.file.delete({
      where: { id: id },
    });
    await cloudinary.uploader.destroy(file.cloudinary_id);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting file", err);
  }
};

exports.getSharedFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await prisma.file.findUnique({
      where: { id: id },
    });
    const user = await prisma.user.findUnique({
      where: { id: file.userId },
    });
    req.file = file;
    req.file.dateFormatted = format(
      new Date(req.file.createdAt),
      "dd MMM, yyyy HH:mm"
    );
    req.file.user = user.name;
    res.render("sharedFile", { file: file });
  } catch (err) {
    console.error("Error fetching file", err);
    res.redirect("/");
  }
};
