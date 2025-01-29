require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./config/passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const app = express();
const PORT = process.env.PORT || 3000;

const homeRouter = require("./routes/homeRoute");
const loginRouter = require("./routes/loginRoute");
const registerRouter = require("./routes/registerRoute");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);
app.use("/sign-up", registerRouter);
app.use("/login", loginRouter);
app.use("/", homeRouter);

app.listen(PORT, () => console.log(`Server is up at port ${PORT}`));
