import User from "../models/usuario.js";
import passport from "passport";

export const signin = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Server error." });
      }
  
      if (!user) {
        return res.status(400).json({ success: false, message: "credenciales invalidas." });
      }
  
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: "falla en logearse." });
        }
        
        return res.status(200).json({ success: true, message: "Logeo exitoso", user });
      });
    })(req, res, next);
  };