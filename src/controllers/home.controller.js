export const homeUser = (req, res) => {
    res.status(200).json({
        message: `Bienvenido, ${req.user.nombre_usuario}. Has accedido a tu página de inicio.`,
        id_usuario: req.user.id_usuario
    });
};
