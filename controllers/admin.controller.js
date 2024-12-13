import { pool } from "../db.js";
import Recurso from "../models/recurso.js";

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

// Método para obtener todos los recursos
export const obtenerRecurso = async (req, res) => {
  try {
    const recursos = await Recurso.find();
    res.status(200).json({ success: true, data: recursos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al obtener los recursos" });
  }
};

// Método para buscar recursos por tipo de recurso
export const buscarRecursosPorTipo = async (req, res) => {
  try {
    const { tipo_recurso } = req.params;

    // Validar si el tipo de recurso es válido
    const tiposValidos = ['CertamenSS', 'CertamenCS', 'Tarea', 'ControlSS', 'ControlCS', 'Apunte'];
    if (!tiposValidos.includes(tipo_recurso)) {
      return res.status(400).json({ 
        success: false, 
        message: `El tipo de recurso debe ser uno de los siguientes: ${tiposValidos.join(', ')}` 
      });
    }

    const recursos = await Recurso.find({ tipo_recurso });
    res.status(200).json({ success: true, data: recursos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al buscar los recursos por tipo" });
  }
};

// Borra un usuario de la base de datos
export const borrarUsuario = async (req, res) => {
  try {
    const { nombre_usuario } = req.body;
    const [result] = await pool.execute(
      "DELETE FROM Usuario WHERE nombre_usuario = ?", 
      [nombre_usuario]
    );

    if (result.affectedRows > 0) {
      return res.json({ message: "Usuario borrado correctamente" });
    }
    res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al borrar usuario", error });
  }
};

// Borra un recurso de la base de datos
export const borrarRecurso = async (req, res) => {
    try {
      const { id_recurso } = req.body;
      const recursoEliminado = await Recurso.findByIdAndDelete(id_recurso);
      if (!recursoEliminado) {
        return res.status(404).json({ message: "Recurso no encontrado" });
      }
      res.json({ message: "Recurso borrado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al borrar recurso", error });
    }
};