import { pool } from "../db.js";

export const esAdmin = async (req, res, next) => {
    try {
      const { id_usuario } = req.user;
      const [result] = await pool.execute(
        "SELECT isAdmin FROM Usuario WHERE id_usuario = ?", 
        [id_usuario]
      );
  
      if (result[0].isAdmin === 1) {
        next();
      } else {
        res.status(401).json({ message: "Acceso denegado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al verificar administrador", error });
    }
};