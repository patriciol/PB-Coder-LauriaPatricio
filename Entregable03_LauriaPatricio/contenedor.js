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
                if (elemento.id === id) {
                    encontrado = true;
                    productoID = elemento;
                }
            })


            if (!encontrado) {
                console.log("No existe el ID")
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

   
    

}



module.exports = Contenedor;