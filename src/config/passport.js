import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../models/usuario.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        // Match Email's User
        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, { message: "Usuario no encontrado." });
        }

      // Match Password's User
        const isMatch = await user.matchPassword(password);
        if (!isMatch)
          return done(null, false, { message: "Contraseña incorrecta." });
      
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

//passport.deserializeUser((id, done) => {
//  User.findById(id, (err, user) => {
//    done(err, user);
//  });
//});
passport.deserializeUser (async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});