import { pool } from "../db.js";
//logeo y registro
import bcrypt from "bcryptjs";
//logeo
//import passport from "passport";

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

    const [userRows] = await pool.query("SELECT * FROM Usuario WHERE id_usuario = ?", [rows.insertId]);
    const user = userRows[0];

    req.login(user, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: "Error en el servidor." });
        }
  
        return res.status(200).json({ success: true, message: "Registro y sesión creados exitosamente" });
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Algo salió mal" });
  }
};


export const logearse = async (req, res) => {    
  
    if (req.isAuthenticated()) {
        return res.status(400).json({ success: false, message: "Ya estás logueado." });
    }

    const { correo_electronico, contrasenia } = req.body;

    try {
      // Verificar si el usuario existe
      const [rows] = await pool.query("SELECT * FROM Usuario WHERE correo_electronico = ?", [correo_electronico]);
  
      if (rows.length === 0) {
        return res.status(400).json({ success: false, message: "Credenciales inválidas." });
      }
  
      const user = rows[0];
  
      // Comparar la contraseña proporcionada con la almacenada
      const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
  
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Credenciales inválidas." });
      }
  
    req.login(user, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Error en el servidor." });
        }

        // Responder con éxito y datos del usuario
        return res.status(200).json({ success: true, message: "Inicio de sesión exitoso" });
    });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Error en el servidor." });
    }
};
  
export const deslogearse = async (req, res, next) => {
    try {
      // Verificar si el usuario está autenticado con Passport
      if (!req.isAuthenticated()) {
        return res.status(400).json({ success: false, message: "No active session found." });
      }
  
      // Realizar logout de Passport
      req.logout((err) => {
        if (err) {
          console.error('Logout error:', err);
          return res.status(500).json({ success: false, message: "Failed to log out. Please try again." });
        }
  
        // Destruir la sesión
        req.session.destroy((err) => {
          if (err) {
            console.error('Session destruction error:', err);
            return res.status(500).json({ success: false, message: "Failed to clear session." });
          }
  
          // Responder con éxito
          res.status(200).json({ success: true, message: "You are logged out successfully." });
        });
      });
    } catch (error) {
      console.error('Logout unexpected error:', error);
      return res.status(500).json({ success: false, message: "An unexpected error occurred. Please try again." });
    }
  };
  