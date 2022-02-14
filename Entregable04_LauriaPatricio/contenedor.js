const fs = require('fs');

class Contenedor {

    constructor(url) {
        this.url = url;
    }


    async getById(id) {
        try {
            let encontrado = false;
            let productoID
            const productos = await fs.promises.readFile(this.url, 'utf-8')
            const arrayProductos = JSON.parse(productos)

            arrayProductos.forEach(elemento => {
                if (elemento.id === +id) {
                    encontrado = true;
                    productoID = elemento;
                }
            })


            if (!encontrado) {
                console.log("No existe el ID")
                productoID={error:"No existe el ID"}
            }
            return productoID;

        }
        catch (err) {
            console.log(err.message)
        }
    }


    async getAll() {
        try {

            const productos = await fs.promises.readFile(this.url, 'utf-8')
            const arrayProductos = JSON.parse(productos)
            return arrayProductos;
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async save(nuevoObjeto) {

        try {
            const productos = await fs.promises.readFile(this.url, 'utf-8')
            const arrayProductos = JSON.parse(productos)
            
            if (arrayProductos.length === 0) {
                nuevoObjeto.id = 1;
            }
            else {
                nuevoObjeto.id = arrayProductos.length + 1;
            }
            arrayProductos.push(nuevoObjeto)
            await fs.promises.writeFile(this.url, JSON.stringify(arrayProductos, null, 2));

        }
        catch (err) {
            console.log(err.message)
        }
    }

    async actualizar(arrayProductos){
        try {
            await fs.promises.writeFile(this.url, JSON.stringify(arrayProductos, null, 2));

        }
        catch (err) {
            console.log(err.message)
        }

    }


}



module.exports = Contenedor;