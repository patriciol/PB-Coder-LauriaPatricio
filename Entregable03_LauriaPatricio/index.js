const express = require('express')

const app = express();

const PORT = process.env.PORT || 8080

const Contenedor = require("./contenedor.js");
const productos = new Contenedor("./productos.txt")

app.get('/', async (req, res) => {

    res.send(`<h1>Bienvenido</h1>`)
})

app.get('/productos', async (req, res) => {

    let arrayProd = await productos.getAll();
    arrayProd = JSON.stringify(arrayProd, undefined, 2)
    res.send(`<h1>Mis Productos son:</h1> <pre>${arrayProd}</pre>`)
})

app.get('/productoRandom', async (req, res) => {

    let todosProd = await productos.getAll();
    let cantidad = todosProd.length;

    let idRandom = Math.round((Math.random() * (cantidad - 1)) + 1)
    let prodRandom = await productos.getById(idRandom)

    prodRandom = JSON.stringify(prodRandom, undefined, 2)

    res.send(`<h1>ID Random es ${idRandom}</h1> <pre>${prodRandom}</pre>`)

})

const server = app.listen(PORT, () => {
    console.log(`Servidor activo ${PORT}`)
})
server.on("eror", error => console.log(error))