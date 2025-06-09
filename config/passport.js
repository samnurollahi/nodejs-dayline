const passport = require("passport");
const { Strategy } = require("passport-local");

const User = require("../models/user");

passport.use(
  new Strategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "ایمیل یا رمز عبور اشتباه است" });
        }
        if (!password == user.password) {
          return done(null, false, { message: "ایمیل یا رمز عبور اشتباه است" });
        }
        done(null, user);
      } catch (err) {
        //code
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  done(null, user);
});
