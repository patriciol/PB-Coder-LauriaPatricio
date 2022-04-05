const { normalize, denormalize, schema } = require('normalizr')

const util = require('util')
function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}


const authorSchema = new schema.Entity('author');
const articleSchema = new schema.Entity("article", {
  author: authorSchema
});
const postSchema = new schema.Entity("post", {
  messages: [articleSchema]
});



const normalizedMensaje = (arrayMensajes) => {
       return normalize(arrayMensajes, postSchema)
}

const denormalizedMensaje = (arrayNormalizeMensajes) => { 
    console.log("HOLAA LLEGO ACA")

   // return denormalize(arrayNormalizeMensajes.result, mensajesSchema, arrayNormalizeMensajes.entities)
}


module.exports = {
    normalizedMensaje,
    denormalizedMensaje
}