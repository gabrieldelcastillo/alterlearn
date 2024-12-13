import { pool } from "../db.js";

// Método para que el supervisor acceda mediante una clave especial
export const Acceder = async (req, res) => {
  try {
    const { claveAcceso } = req.body;

    // Verifica que la clave de acceso sea la esperada
    if (claveAcceso === "Pornhub") {
      return res.json({ message: "Acceso concedido" });
    }
    res.status(401).json({ message: "Acceso denegado" });
  } catch (error) {
    res.status(500).json({ message: "Error al acceder", error });
  }
};

// Otorga permisos de administrador a un usuario por nombre
export const otorgarPermisos = async (req, res) => {
  try {
    const { nombre_usuario } = req.body;
    const [result] = await pool.execute(
      "UPDATE Usuario SET isAdmin = 1 WHERE nombre_usuario = ?", 
      [nombre_usuario]
    );

    if (result.affectedRows > 0) {
      return res.json({ message: "Permisos otorgados correctamente" });
    }
    res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al otorgar permisos", error });
  }
};

// Deniega los permisos de administrador de un usuario por nombre
export const denegarPermisos = async (req, res) => {
  try {
    const { nombre_usuario } = req.body;
    const [result] = await pool.execute(
      "UPDATE Usuario SET isAdmin = 0 WHERE nombre_usuario = ?", 
      [nombre_usuario]
    );

    if (result.affectedRows > 0) {
      return res.json({ message: "Permisos revocados correctamente" });
    }
    res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al denegar permisos", error });
  }
};

// Obtiene la lista de usuarios, con opción de filtrar por nombre
export const obtenerUsuarios = async (req, res) => {
  try {
    const { nombre_usuario } = req.query;
    
    let query = "SELECT id_usuario, nombre_usuario, correo_electronico, isAdmin FROM Usuario";
    const params = [];

    if (nombre_usuario) {
      query += " WHERE nombre_usuario LIKE ?";
      params.push(`%${nombre_usuario}%`);
    }
    
    const [usuarios] = await pool.execute(query, params);
    res.json({ usuarios });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};
