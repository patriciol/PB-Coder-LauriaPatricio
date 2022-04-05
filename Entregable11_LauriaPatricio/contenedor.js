const fs = require('fs');

//
const { normalize, schema } = require('normalizr')
const authorSchema = new schema.Entity('author')
const textSchema = new schema.Entity('text')
const fechaSchema = new schema.Entity('fecha')
const postSchema = new schema.Entity('post', {
    id: 'mensajes',
    mensajes: [{
        author: authorSchema,
        text: textSchema,
        fecha: fechaSchema
    }]

});
   
//

class Contenedor {

    constructor(url) {
        this.url = url;
    }

    getAll = async () => {
        try {

            const mensajes = await fs.promises.readFile(this.url, 'utf-8')
            const arrayMensajes = JSON.parse(mensajes)
            const normalizedMensaje = normalize(arrayMensajes, postSchema);
            return normalizedMensaje;
        }
        catch (err) {
            console.log(err.message)
        }
    }

    save = async (nuevoObjeto) => {

        try {
            const productos = await fs.promises.readFile(this.url, 'utf-8')
            const arrayProductos = JSON.parse(productos)
            arrayProductos.push(nuevoObjeto)
            await fs.promises.writeFile(this.url, JSON.stringify(arrayProductos, null, 2));
        }
        catch (err) {
            console.log(err.message)
        }
    }


}

module.exports = Contenedor;