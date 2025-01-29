const { PrismaClient } = require("@prisma/client");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");

const prisma = new PrismaClient();

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: email },
          });
          if (!user) {
            return done(null, false, {
              message: "No user with that email has been found",
            });
          }
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = initialize;
