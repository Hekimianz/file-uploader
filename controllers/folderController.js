const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.getFolder = async (req, res, next) => {
  try {
    const { id, name } = req.params;
    const folder = await prisma.folder.findUnique({
      where: { id: id, name: name },
    });
    req.folder = folder;
    next();
  } catch (err) {
    console.error("Error fetching folder:", err);
    res.redirect("/");
  }
};

exports.getFolderFiles = async (req, res, next) => {
  try {
    const { id } = req.params;
    const files = await prisma.file.findMany({
      where: { folderId: id },
    });
    req.files = files;
    next();
  } catch (err) {
    console.error("Error fetching files", err);
  }
};

exports.renderFolder = async (req, res) => {
  try {
    res.render("folder", { folder: req.folder, files: req.files });
  } catch (err) {
    console.error("Error rendering folder", err);
    res.redirect("/");
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const folderEndpoint = `folder/${req.params.id}/${req.params.name}`;
    if (!req.file) {
      return res.status(400).redirect("/" + folderEndpoint);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: req.user.id,
      resource_type: "auto",
    });

    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,
        url: result.secure_url,
        folderId: req.params.id,
        userId: req.user.id,
        cloudinary_id: result.public_id,
      },
    });

    console.log("File uploaded successfully:", file);

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting temporary file", err);
      }
    });

    res.redirect("/" + folderEndpoint);
  } catch (err) {
    console.error("Error uploading file", err);
    res.status(500).redirect(`/folder/${req.params.id}/${req.params.name}`);
  }
};

async function deleteFile(file) {
  try {
    const resourceType = file.url.includes("/raw/") ? "raw" : "auto";
    await cloudinary.uploader.destroy(file.cloudinary_id, {
      resource_type: resourceType,
    });
    return true;
  } catch (err) {
    console.error("Error deleting file from Cloudinary:", err);
    return false;
  }
}

exports.deleteFiles = async (req, res, next) => {
  try {
    const id = req.params.id;
    const files = await prisma.file.findMany({
      where: { folderId: id },
    });

    for (const file of files) {
      await prisma.file.delete({ where: { id: file.id } });
      await deleteFile(file);
    }

    await prisma.folder.delete({ where: { id: id } });

    res.redirect("/");
  } catch (err) {
    console.error("Error deleting folder", err);
    res.redirect("/");
  }
};
