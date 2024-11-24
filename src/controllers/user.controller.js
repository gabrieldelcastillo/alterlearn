import { pool } from "../db.js";
import bcrypt from "bcrypt";

export const registrarse = async (req, res) => {
  try {
    const { nombre_usuario, correo_electronico, contrasenia, isAdmin = 0, admin_key } = req.body;
    let errors = [];

    // Validación de la contraseña
    if (!contrasenia || contrasenia.length < 4) {
      errors.push({ text: "La contraseña debe tener al menos 4 caracteres" });
    }

    // Validación de campos requeridos
    if (!nombre_usuario || !correo_electronico || !contrasenia) {
      errors.push({ text: "Faltan campos por completar." });
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Verificar si el correo ya está en uso
    const [emailFound] = await pool.query("SELECT * FROM Usuario WHERE correo_electronico = ?", [correo_electronico]);
    if (emailFound.length > 0) {
      return res.status(400).json({ success: false, message: "El correo ya está en uso." });
    }

    // Verificar si el nombre de usuario ya está en uso
    const [userFound] = await pool.query("SELECT * FROM Usuario WHERE nombre_usuario = ?", [nombre_usuario]);
    if (userFound.length > 0) {
      return res.status(400).json({ success: false, message: "El nombre de usuario ya está en uso." });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    // Guardar el nuevo usuario
    const [rows] = await pool.query(
      "INSERT INTO Usuario (nombre_usuario, correo_electronico, contrasenia, isAdmin, admin_key) VALUES (?, ?, ?, ?, ?)",
      [nombre_usuario, correo_electronico, hashedPassword, isAdmin, admin_key]
    );

    res.status(201).json({ success: true, message: "Registro exitoso", id_usuario: rows.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Algo salió mal" });
  }
};