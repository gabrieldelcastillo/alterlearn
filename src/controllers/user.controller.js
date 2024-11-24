import { pool } from "../db.js";
//logeo y registro
import bcrypt from "bcrypt";
//logeo
import passport from "passport";

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

export const logearse = async (req, res) => {
  const { correo_electronico, contrasenia } = req.body;

  // Crear una promesa para la autenticación de Passport
  const authenticateUser  = () => {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          return reject(info.message || "Credenciales inválidas.");
        }
        resolve(user);
      })(req, res);
    });
  };

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

    // Aquí puedes establecer la sesión del usuario si es necesario
    req.session.userId = user.id_usuario; // Ejemplo de cómo guardar el ID del usuario en la sesión

    // Iniciar sesión
    await authenticateUser ();

    return res.status(200).json({ success: true, message: "Inicio de sesión exitoso", user: { id_usuario: user.id_usuario, nombre_usuario: user.nombre_usuario, correo_electronico: user.correo_electronico } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error en el servidor." });
  }
};

export const deslogearse = async (req, res, next) => {
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