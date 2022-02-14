const fs = require('fs');

/*Creo la clase "Contenedor" con sus metodos*/
class Contenedor {

    constructor(url) {
        this.url = url;
    }

    save = async (nuevoObjeto) => {

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
            console.log("El id del nuevo objecto es: " + nuevoObjeto.id)
            return nuevoObjeto.id;
        }
        catch (err) {
            console.log(err.message)
        }
    }


    getById = async (id) => {
        try {
            let encontrado = false;
            const productos = await fs.promises.readFile(this.url, 'utf-8')
            const arrayProductos = JSON.parse(productos)

            arrayProductos.forEach(elemento => {
                if (elemento.id === id) {
                    console.log(elemento)
                    encontrado = true;
                    return elemento;
                }
            })

            if (!encontrado) {
                console.log("No existe el ID")
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }


    getAll = async () => {
        try {

            const productos = await fs.promises.readFile(this.url, 'utf-8')
            const arrayProductos = JSON.parse(productos)

            console.log(arrayProductos)
            return arrayProductos;
        }
        catch (err) {
            console.log(err.message)
        }
    }

    deleteAll = async () => {
        try {
            console.log("se elimina todo")
            await fs.promises.writeFile(this.url, "");

        }
        catch (err) {
            console.log(err.message)

        }

    }

    deleteById = async (id) => {


        try {
            const productos = await fs.promises.readFile(this.url, 'utf-8')
            const arrayProductos = JSON.parse(productos)
            let encontrado = false

            const arrayNuevo = arrayProductos.filter(elemento => {
                if (elemento.id !== id) {
                    return elemento.id !== id;

                }
                else {
                    encontrado = true;
                }
            })


            await fs.promises.writeFile(this.url, JSON.stringify(arrayNuevo, null, 2));


            if (encontrado === true) {
                console.log("Se elimina el objeto con id: " + id)
            }
            else {
                console.log("No existe el id")
            }
        }
        catch (err) {
            console.log(err.message)

        }

    }

}



const contenedor1 = new Contenedor('./productos.txt')


const objeto = {
    title: 'lapicera',
    price: 300,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
}



//Ejemplos de uso de los metodos
//const idNuevo = contenedor1.save(objeto)
//const elemento = contenedor1.getById(2)
//const allObjetos = contenedor1.getAll();
//contenedor1.deleteById(4);
//contenedor1.deleteAll();



