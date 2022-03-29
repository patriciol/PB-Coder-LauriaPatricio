const fs = require('fs');
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

class FileContainer {
    constructor(url) {
        this.url = url
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
                productoID = undefined;
            }
            return productoID;

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
                nuevoObjeto.timestamp = hoy.toLocaleDateString()
            }
            arrayProductos.push(nuevoObjeto)
            await fs.promises.writeFile(this.url, JSON.stringify(arrayProductos, null, 2));

        }
        catch (err) {
            console.log(err.message)
        }
    }

    async deleteById(id) {


        try {
            const carrito = await fs.promises.readFile(this.url, 'utf-8')
            const arrayCarrito = JSON.parse(carrito)
            let encontrado = false
            let respuesta

            const arrayNuevo = arrayCarrito.filter(elemento => {
                if (elemento.id == id) {
                    encontrado = true;
                    return false;
                }
                else {

                    return true;
                }
            })


            await fs.promises.writeFile(this.url, JSON.stringify(arrayNuevo, null, 2));


            if (encontrado) {
                return { "msj": `Se elimina el objeto con id: ${id}` }

            }
            else {
                return { "msj": `no existe el ID:${id}` }
            }
        }
        catch (err) {
            console.log(err.message)

        }

    }

    async updateById(id, productoActualizar) {
        try {

            let productos = await fs.promises.readFile(this.url, 'utf-8')
            const arrayProductos = JSON.parse(productos)
            let pos = arrayProductos.findIndex(e => e.id === +id)
            if (pos != -1) {
                arrayProductos[pos] = productoActualizar
                await fs.promises.writeFile(this.url, JSON.stringify(arrayProductos, null, 2));
                return { resultado: 'resultado PUT OK' }
            }
            else {
                return { error: 'Producto no encontrado' }
            }

        }
        catch (err) {
            console.log(err.message)
        }

    }


    async addProduct(id, producto) {
        try {
            let encontrado = false;
            const carts = await fs.promises.readFile(this.url, 'utf-8')
            const arrayCarts = JSON.parse(carts)

            arrayCarts.forEach(elemento => {
                if (elemento.id === +id) {

                    elemento.productos.push(producto);
                    encontrado = true;
                }
            })

            await fs.promises.writeFile(this.url, JSON.stringify(arrayCarts, null, 2));


            if (!encontrado) {
                producto = { error: "No existe el carrito con ID: " + id }
            }
            else {
                producto = { msj: "Producto agregado al carrito con ID: " + id }
            }
            return producto;

        }
        catch (err) {
            console.log(err.message)
        }
    }


    async createCart(productos) {

        try {

            const carrito = {}
            const carritoTxt = await fs.promises.readFile(this.url, 'utf-8')
            const arrayCarrito = JSON.parse(carritoTxt)
            carrito.productos = []

            if (arrayCarrito.length === 0) {
                carrito.id = 1;
                carrito.timestamp = hoy.toLocaleDateString()
                if (Object.entries(productos).length > 0) {
                    carrito.productos.push(productos)
                }
            }
            else {
                carrito.id = arrayCarrito.length + 1;
                carrito.timestamp = hoy.toLocaleDateString()
                if (Object.entries(productos).length > 0) {
                    carrito.productos.push(productos)
                }

            }
            arrayCarrito.push(carrito)
            await fs.promises.writeFile(this.url, JSON.stringify(arrayCarrito, null, 2));
            return { "msj": `Carrito creado con id: ${carrito.id}` }
        }
        catch (err) {
            console.log(err.message)
        }
    }


    async deleteProductByCart(idCarrito, idProd) {


        try {
            let encontrado = false;
            let respuesta
            let posicion
            const carritos = await fs.promises.readFile(this.url, 'utf-8')
            const arrayCarrito = JSON.parse(carritos)

            arrayCarrito.forEach(carrito => {
                if (carrito.id == +idCarrito) {
                    posicion = carrito.productos.findIndex(producto => producto.id == +idProd)
                    if (posicion >= 0) {
                        carrito.productos.splice(posicion, 1)
                        encontrado = true;

                    }

                }
            })

            await fs.promises.writeFile(this.url, JSON.stringify(arrayCarrito, null, 2));


            if (!encontrado) {
                respuesta = { error: "No existe el carrito con ID: " + idCarrito +" o item con ID "+idProd }
            }
            else {
                respuesta = { msj: "Producto eliminado del carrito con ID: " + idCarrito }
            }
            return respuesta;

        }
        catch (err) {
            console.log(err.message)
        }


    }
}

module.exports = FileContainer;