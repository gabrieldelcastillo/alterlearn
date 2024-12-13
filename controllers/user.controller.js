import { pool } from "../db.js";
import Recurso from "../models/recurso.js";
import path from "path"
import bcrypt from "bcryptjs";
import fs from 'fs';

// 1 caracter especial y un numero
export const registrarse = async (req, res) => {
  try {
    const { nombre_usuario, correo_electronico, contrasenia} = req.body;

    // Validación de la contraseña
    if (!contrasenia || contrasenia.length < 8) {
      return res.status(400).json({success: false, message: "La contraseña debe tener al menos 8 caracteres" });
    }

    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<> ]/;
    if (!specialCharacterRegex.test(contrasenia)) {
      return res.status(400).json({success: false, message: "La contraseña debe contener al menos un carácter especial" });
    }

    const numberRegex = /\d/; 
    if (!numberRegex.test(contrasenia)) {
      return res.status(400).json({success: false, message: "La contraseña debe contener al menos un número" });
    }

    // Validación de campos requeridos
    if (!nombre_usuario || !correo_electronico || !contrasenia) {
      return res.status(400).json({success: false, message: "Faltan campos por completar" });
    }

    //validar si es estudiante de la UV
    const emailRegex = /^[^\s@]+@alumnos\.uv\.cl$/;
    if (!emailRegex.test(correo_electronico)) {
      return res.status(400).json({success: false, message: "El correo electrónico debe tener la extensión @alumnos.uv.cl" });
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
      "INSERT INTO Usuario (nombre_usuario, correo_electronico, contrasenia) VALUES (?, ?, ?)",
      [nombre_usuario, correo_electronico, hashedPassword]
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

    const { nombre_usuario, contrasenia } = req.body;

    try {
      // Verificar si el usuario existe
      const [rows] = await pool.query("SELECT * FROM Usuario WHERE nombre_usuario = ?", [nombre_usuario]);
  
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

export const cambiarNombre = async (req, res) => {
  try {
    const { correo_electronico, nuevo_nombre } = req.body;

    // Validar que se proporciona el correo de usuario y el nuevo nombre
    if (!correo_electronico || !nuevo_nombre) {
      return res.status(400).json({ message: "Se requieren el correo_electronico y el nuevo nombre" });
    }

    // Verificar si el nuevo nombre ya está en uso
    const [nombreExistente] = await pool.query("SELECT * FROM Usuario WHERE nombre_usuario = ?", [nuevo_nombre]);
    if (nombreExistente.length > 0) {
      return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
    }

    // Actualizar el nombre de usuario
    const [usuarioActualizado] = await pool.query(
      "UPDATE Usuario SET nombre_usuario = ? WHERE correo_electronico = ?", 
      [nuevo_nombre, correo_electronico]
    );

    if (usuarioActualizado.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró el usuario" });
    }

    res.status(200).json({ message: "Nombre actualizado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar el nombre de usuario", error });
  }
};

// Cambiar la contraseña del usuario
export const cambiarContra = async (req, res) => {
  try {
    const { correo_electronico, nueva_contrasenia } = req.body;

    // Validar que se proporcionen los parámetros obligatorios
    if (!correo_electronico || !nueva_contrasenia) {
      return res.status(400).json({ message: "Se requieren el correo_electronico y la nueva contraseña" });
    }

    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashContrasenia = await bcrypt.hash(nueva_contrasenia, salt);

    // Actualizar la contraseña del usuario
    const [usuarioActualizado] = await pool.query(
      "UPDATE Usuario SET contrasenia = ? WHERE correo_electronico = ?", 
      [hashContrasenia, correo_electronico]
    );

    if (usuarioActualizado.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró el usuario" });
    }

    res.status(200).json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar la contraseña", error });
  }
};

export const publicarRecuros = async (req, res) => {
  try {
    const data = req.body.data ? JSON.parse(req.body.data) : null;
    const { carrera, nombre_asignatura, profesor, anio, tipo_recurso, contenido } = data;
    const archivo = req.files?.archivo;
    // Validación de campos obligatorios
    if (!carrera || !nombre_asignatura || !anio || !tipo_recurso || !contenido) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    if (!archivo || !archivo.name || !archivo.mimetype || !archivo.size) {
      return res.status(400).json({ message: "archivo PDF no proporcionado" });
    }

    if (!Array.isArray(contenido) || contenido.length === 0) {
      return res.status(400).json({ message: "El campo 'contenido' debe ser un arreglo de strings con al menos un valor" });
    }

    if (!/^\d{4}$/.test(anio.toString())) {
      return res.status(400).json({ message: "El año debe ser un número de 4 dígitos" });
    }

    if (!archivo.name.endsWith(".pdf") || archivo.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: "El archivo debe ser un PDF" });
    }

    if (archivo.size > 16 * 1024 * 1024) { 
      return res.status(400).json({ message: "El archivo no puede superar los 16 MB" });
    }    

    // Comprobar si el tipo de recurso es uno de los permitidos
    const preciosFijos = {
      CertamenCS: 1000,
      CertamenSS: 800,
      ControlCS: 650,
      ControlSS: 500,
      Tarea: 250,
      Apunte: 750
    };

    if (!preciosFijos.hasOwnProperty(tipo_recurso)) {
      return res.status(400).json({ message: "El tipo de recurso no es válido" });
    }



    const uploadPath = path.resolve("./uploads", archivo.name);
    await archivo.mv(uploadPath);

    // Crear el nuevo recurso con precio fijo según el tipo de recurso
    const nuevoRecurso = new Recurso({ 
      precio: preciosFijos[tipo_recurso], 
      profesor: profesor || null, // Si el profesor no se especifica, se deja en null
      nombre_asignatura, 
      contenido, 
      carrera, 
      tipo_recurso, 
      archivo_pdf: `/uploads/${archivo.name}`,
      anio 
    });

    await nuevoRecurso.save();
    res.status(201).json({ message: "Recurso publicado con éxito", recurso: nuevoRecurso });
  } catch (error) {
    console.error("Error al publicar el recurso:", error);
    res.status(500).json({ message: "Error al publicar el recurso", error });
  }
};

export const borrarCuenta = async (req, res) => {
  try {
    // Verificar que el usuario está autenticado
    if (!req.isAuthenticated()) {
      return res.status(401).json({ success: false, message: "No autorizado" });
    }

    // Obtener el id del usuario desde la sesión
    const userId = req.user.id_usuario;

    // Eliminar al usuario de la base de datos
    const result = await pool.query("DELETE FROM Usuario WHERE id_usuario = ?", [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Cerrar la sesión del usuario
    req.logout((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error al cerrar la sesión" });
      }

      return res.status(200).json({ success: true, message: "Cuenta eliminada exitosamente" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error al eliminar la cuenta" });
  }
};
