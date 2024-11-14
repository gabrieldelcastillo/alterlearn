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
  const userFound = await User.findOne({ name: name });

  if (emailFound && userFound) {
    return res.status(400).json({success: false, message: "El correo y el nombre de usuario ya están en uso."});
  } 

  if (emailFound) {
    return res.status(400).json({ success: false, message: "El correo ya esta en uso." });
  }

  if (userFound) {
    return res.status(400).json({ success: false, message: "El nombre de usuario ya esta en uso." });
  }

  // guardar el nuevo usuario
  const newUser = new User({ name, email, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save(); 
  console.log(newUser)
  res.status(201).json({ success: true, message: "Se ha registrado de manera exitosa" });
};