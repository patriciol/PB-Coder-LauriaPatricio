
const admin = true;

const authorizer = (req, res, next) => {

    const ruta = req.originalUrl
    const method = req.method
    if (admin) {
        next();
    }
    else {
        res.json({ error: ` -1, descripcion: ruta ${ruta} método ${method} no autorizado`})
    }
}

module.exports=authorizer;