const dbconfig = require('./db/config.js');
let knex

class Contenedor {

    constructor(constructor, tabla) {
        this.tabla = tabla;
        if (constructor === 'mariaDB') {
            this.knex = require('knex')(dbconfig.mariaDB)
        } else {
            this.knex = require('knex')(dbconfig.sqlite)
        }
    }

    async getAll() {
        try {

            const tabla = await this.knex.from(this.tabla).select("*");
            console.log("Tabla Actualizada")
            return tabla;
        }
        catch (err) {
            console.log(err.message)
        }

    }

    async save(nuevoObjeto) {

        try {

            await this.knex(this.tabla).insert(nuevoObjeto)
            console.log("Objeto insertado")
        }
        catch (err) {
            console.log(err.message)
        }

    }

}

module.exports = Contenedor;