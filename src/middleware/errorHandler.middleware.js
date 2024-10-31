
export const errorHandler = (err, req, res, next) => {
    console.error(err)
    res.status(500).json({
        message: 'Error interno del servidor. Inténtalo de nuevo más tarde.'
    })
}

//este error detiene el servidor
export const errorRuta1 = (err, req, res, next) => {
    console.error(err)
    res.status(404).json({
        message: 'Ruta inexistente'
    })
}
//este error hace que el servir persista mandando un mensaje
export const errorRuta = (req, res, next) => {
    res.status(404).json({
        message: 'Ruta inexistente'
    })
}