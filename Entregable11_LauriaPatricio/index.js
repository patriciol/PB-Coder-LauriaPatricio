const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOserver } = require('socket.io')
const { generateArray } = require('./utils/index');
const Contenedor = require("./contenedor.js");
const mensajes = new Contenedor('./mensajes.txt')
const moment = require('moment')



const app = express();

const httpServer = new HttpServer(app)
const io = new IOserver(httpServer)

const PORT = process.env.PORT || 8080
app.use(express.static('./public'))

const path = require('path')
//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor activo ${PORT}`)
})
connectedServer.on("eror", error => console.log(error))



io.on('connection', (socket) => {
    console.log("¡Nuevo cliente conectado!")
    const arreglo = generateArray(5)

    socket.emit('productos', arreglo)

      mensajes.getAll()
            .then(arrayMsg => {
                socket.emit('mensajes', arrayMsg)
            })
            .catch(err => {
                console.log(err)
            })
    
        socket.on('new-msg', async (data) => {
    
            fecha = moment().format('DD/M/YYYY HH:mm:ss')
            data.fecha = `[${fecha}]`
            await mensajes.save(data);
            let arrayMsg = await mensajes.getAll()
            io.sockets.emit('mensajes', arrayMsg)
        })
    
})