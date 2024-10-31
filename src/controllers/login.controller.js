import { pool } from '../db.js';

export const loginUser = async (req, res) => {
    try {
        const { nombre_usuario, correo_electronico, contrasenia } = req.body;
        const [user] = await pool.query(
            'SELECT * FROM Usuario WHERE correo_electronico = ? OR nombre_usuario = ?', 
            [correo_electronico, nombre_usuario]
        );

        if (user.length === 0) {
            return res.status(401).json({
                message: 'El correo electrónico o el nombre de usuario son incorrectos.'
            });
        }

        if (user[0].contrasenia !== contrasenia) {
            return res.status(401).json({
                message: 'La contraseña es incorrecta. Verifica que hayas ingresado correctamente el correo o nombre de usuario y la contraseña.'
            });
        }

        res.status(200).json({
            id_usuario: user[0].id_usuario,
            nombre_usuario: user[0].nombre_usuario,
            correo_electronico: user[0].correo_electronico,
            message: 'Inicio de sesión exitoso.'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al iniciar sesión. Inténtalo de nuevo más tarde.'
        });
    }
};
