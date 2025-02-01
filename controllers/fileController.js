const prisma = require("../config/prisma");
const { format } = require("date-fns");

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
    console.log(req.file);
    res.render("file", { file: req.file });
  } catch (err) {
    console.error("Error rendering file", err);
  }
};
