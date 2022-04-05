const fs = require('fs');
const util = require('util')
const { normalizedMensaje } = require('./utils/normlizr')
class Contenedor {

    constructor(url) {
        this.url = url;
    }

    getAll = async () => {
        try {

            const mensajes = await fs.promises.readFile(this.url, 'utf-8')
            const arrayMensajes = JSON.parse(mensajes)
            const normalizadoMensaje = normalizedMensaje(arrayMensajes)
            return normalizadoMensaje;
        }
        catch (err) {
            console.log(err.message)
        }
    }

    save = async (nuevoObjeto) => {

        try {
            const productos = await fs.promises.readFile(this.url, 'utf-8')
            const arrayProductos = JSON.parse(productos)
            arrayProductos.mensajes.push(nuevoObjeto)
            await fs.promises.writeFile(this.url, JSON.stringify(arrayProductos, null, 2));
        }
        catch (err) {
            console.log(err.message)
        }
    }


}

module.exports = Contenedor;