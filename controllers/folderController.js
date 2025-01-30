const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.renderFolder = async (req, res) => {
  try {
    const { id, name } = req.params;
    const folder = await prisma.folder.findUnique({
      where: { id: id, name: name },
    });
    res.render("folder", { folder: folder });
  } catch (err) {
    console.error("Error fetching folder:", err);
    res.redirect("/");
  }
};

// exports.getFolderFiles = async (req, res) => {
//   try {
//   } catch (err) {
//     console.error("Error fetching files", err);
//   }
// };

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: req.user.id,
    });

    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,
        url: result.secure_url,
        folderId: req.params.id,
        userId: req.user.id,
      },
    });

    console.log("File uploaded successfully:", file);

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting temporary file", err);
      }
    });

    res.redirect("/");
  } catch (err) {
    console.error("Error uploading file", err);
    res.status(500).json({ error: "Failed to upload file" });
  }
};
