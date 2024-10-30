import { pool } from '../db.js';

export const saveUser = async (req, res) => {
    try {
        const { nombre_usuario, correo_electronico, contrasenia } = req.body;

        const [existingUser] = await pool.query(
            'SELECT * FROM Usuario WHERE nombre_usuario = ?', 
            [nombre_usuario]
        );
        
        if (existingUser.length > 0) {
            return res.status(400).json({
                message: 'El nombre de usuario ya está registrado.'
            });
        }

        const [existingEmail] = await pool.query(
            'SELECT * FROM Usuario WHERE correo_electronico = ?', 
            [correo_electronico]
        );

        if (existingEmail.length > 0) {
            return res.status(400).json({
                message: 'El correo electrónico ya está registrado.'
            });
        }

        const [rows] = await pool.query(
            'INSERT INTO Usuario (nombre_usuario, correo_electronico, contrasenia) VALUES (?, ?, ?)', 
            [nombre_usuario, correo_electronico, contrasenia]
        );

        res.status(201).json({
            id_usuario: rows.insertId,
            nombre_usuario,
            correo_electronico
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al registrar el usuario. Inténtalo de nuevo más tarde.'
        });
    }
};
