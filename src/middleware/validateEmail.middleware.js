import { pool } from '../db.js';

const isEmailValid = (email) => {
    const domain = email.split('@')[1];
    return domain === 'alumnos.uv.cl';
};

export const validateEmailMiddleware = (req, res, next) => {
    const { correo_electronico } = req.body;

    if (!isEmailValid(correo_electronico)) {
        return res.status(400).json({
            message: 'El dominio del correo electrónico debe ser @alumnos.uv.cl'
        });
    }

    next();
};
