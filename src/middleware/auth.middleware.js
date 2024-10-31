// middleware/auth.middleware.js
export const isAuthenticated = (req, res, next) => {
    // Aquí podrías verificar si hay un token de sesión en las cookies, headers o en otro lugar
    // Para simplicidad, supongamos que tienes un objeto req.user que contiene la información del usuario autenticado
    if (!req.user) {
        return res.status(403).json({
            message: 'Acceso denegado. Debes iniciar sesión.'
        });
    }

    next();
};
