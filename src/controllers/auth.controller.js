import User from "../models/usuario.js";
import passport from "passport";

export const signup = async (req, res) => {
  let errors = [];
  const { name, email, password } = req.body;

  if (password.length < 4) {
    errors.push({ text: "La contraseña debe tener al menos 4 caracteres" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const emailFound = await User.findOne({ email: email });
  if (emailFound) {
    return res.status(400).json({ success: false, message: "El correo ya esta en uso." });
  }

  const userFound = await User.findOne({ name: name });
  if (userFound) {
    return res.status(400).json({ success: false, message: "El nombre de usuario ya esta en uso." });
  }

  // guardar el nuevo usuario
  const newUser = new User({ name, email, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save(); 
  console.log(newUser)
  res.status(201).json({ success: true, message: "Se ha registrado de maenra exitosa" });
};

export const signin = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error." });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "falla en logearse." });
      }
      
      return res.status(200).json({ success: true, message: "Logeo exitoso", user });
    });
  })(req, res, next);
};


export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to log out." });
    }
    res.status(200).json({ success: true, message: "You are logged out now." });
  });
};