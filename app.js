require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./config/passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./config/prisma");
const app = express();
const PORT = process.env.PORT || 3000;

const homeRouter = require("./routes/homeRoute");
const loginRouter = require("./routes/loginRoute");
const registerRouter = require("./routes/registerRoute");
const folderRouter = require("./routes/folderRoute");
const fileRouter = require("./routes/fileRoute");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
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
app.use("/folder", folderRouter);
app.use("/file", fileRouter);
app.use("/", homeRouter);

app.listen(PORT, () => console.log(`Server is up at port ${PORT}`));
