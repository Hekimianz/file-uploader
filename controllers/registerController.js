const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateRegister = [
  body("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .normalizeEmail()
    .escape(),

  body("name").notEmpty().withMessage("Name is required").trim().escape(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .trim()
    .escape(),

  body("passwordConf")
    .notEmpty()
    .withMessage("Must confirm password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
    .trim()
    .escape(),
];

exports.register = [
  ...validateRegister,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", { errors: errors.array() });
    }
    const { email, password, name } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res
        .status(400)
        .render("signup", { errors: [{ msg: "Email already exists" }] });
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

      res.redirect("/login");
    } catch (err) {
      console.error("Error creating user", err);
      res.status(500).render("signup", {
        errors: [{ msg: "Something went wrong. Please try again." }],
      });
    }
  },
];
