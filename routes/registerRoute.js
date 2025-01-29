const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", (req, res) => res.render("signup"));

router.post("/", async (req, res) => {
  const { email, password, name } = req.body;
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existingUser) {
    return res.status(400).render("signup");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });
    console.log("User created", newUser);
    res.redirect("/login");
  } catch (err) {
    console.error("Error creating user", err);
    res.status(500).render("signup");
  }
});

module.exports = router;
