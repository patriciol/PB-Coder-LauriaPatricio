const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOserver } = require('socket.io')
const moment = require('moment')

const app = express();
const httpServer = new HttpServer(app)
const io = new IOserver(httpServer)

const PORT = process.env.PORT || 8080

const path = require('path')

const Contenedor = require("./contenedor");
const productos = new Contenedor('./productos.txt')
const mensajes = new Contenedor('./mensajes.txt')

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//EJS
app.use(express.static('./public'))

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor activo ${PORT}`)
})
connectedServer.on("eror", error => console.log(error))


//Sockets

io.on('connection', (socket) => {
    console.log("¡Nuevo cliente conectado!")

    productos.getAll()
        .then(arrayProd => {
            socket.emit('productos', arrayProd)
        })
        .catch(err => {
            console.log(err)
        })

    mensajes.getAll()
        .then(arrayMsg => {
            socket.emit('mensajes', arrayMsg)
        })
        .catch(err => {
            console.log(err)
        })






    socket.on('new-product', async (data) => {
        await productos.save(data)
        let arrayProd = await productos.getAll();
        io.sockets.emit('productos', arrayProd)
    })

    socket.on('new-msg', async (data) => {

        fecha = moment().format('DD/M/YYYY HH:mm:ss')
        data.fecha = `[${fecha}]`
        await mensajes.save(data);
        let arrayMsg = await mensajes.getAll()
        io.sockets.emit('mensajes', arrayMsg)
    })

})