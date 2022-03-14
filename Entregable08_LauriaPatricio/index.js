const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOserver } = require('socket.io')
const moment = require('moment')


//Configuro Knex para productos y mensajes
const dbconfig = require('./db/config');
const knexProductos = require('knex')(dbconfig.mariaDB);
const knexMensajes = require('knex')(dbconfig.sqlite);

// Crea tabla de Productos y Mensajes (en caso de no existir)
(async () => {
    try {
        const tableExist = await knexMensajes.schema.hasTable('mensajes');
        if (!tableExist) {
            await knexMensajes.schema.createTable('mensajes', (table) => {
                table.increments('id'); // id => primary key
                table.string('fecha').notNullable();
                table.string('usuario').notNullable();
                table.integer('texto').notNullable();
            });
            console.log('Table created!');
        } else {
            console.log('Skipping creation...');
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }

})();

(async () => {
    try {
        const tableExist = await knexProductos.schema.hasTable('productos');
        if (!tableExist) {
            await knexProductos.schema.createTable('productos', (table) => {
                table.increments('id'); // id => primary key
                table.string('title').notNullable()
                table.integer('price').notNullable()
                table.string('thumbnail').notNullable()
            });
            console.log('Table created!');
        } else {
            console.log('Skipping creation...');
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }

})();

//

const app = express();
const httpServer = new HttpServer(app)
const io = new IOserver(httpServer)

const PORT = process.env.PORT || 8080

const path = require('path')

const Contenedor = require("./contenedor.js");
const productos = new Contenedor("mariaDB", "productos")
const mensajes = new Contenedor("sqlite", "mensajes")

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

    socket.on('new-product', async (data) => {
        await productos.save(data)
        let arrayProd = await productos.getAll();
        io.sockets.emit('productos', arrayProd)
    })

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