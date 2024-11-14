import User from "../models/usuario.js";
import passport from "passport";

export const logout = async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(400).json({ success: false, message: "No active session found." });
      }
  
      req.logout((err) => {
        if (err) {
          console.error('Logout error:', err);
          return res.status(500).json({ success: false, message: "Failed to log out. Please try again." });
        }
  
        req.session.destroy((err) => {
          if (err) {
            console.error('Session destruction error:', err);
            return res.status(500).json({ success: false, message: "Failed to clear session." });
          }
  
          res.status(200).json({ success: true, message: "You are logged out successfully." });
        });
      });
    } catch (error) {
      console.error('Logout unexpected error:', error);
      return res.status(500).json({ success: false, message: "An unexpected error occurred. Please try again." });
    }
  };