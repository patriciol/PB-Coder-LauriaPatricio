const express = require('express')
const router = express.Router();
const Contenedor = require("../../contenedor");
const carrito = new Contenedor("./carrito.txt")
const autMiddleware = require('../../middleware/authorizer')



router.get('/', async (req, res) => {
    let arrayCarritos = await carrito.getAll();

    res.render('carritos',{arrayCarritos})

})


router.post('/', async (req, res) => {
    const carritoAgregar = (req.body);
    respuesta = await carrito.idCarrito(carritoAgregar)
    res.json(respuesta)

})


router.delete('/:id', async (req, res) => {
    let id = req.params.id
    respuesta = await carrito.deleteCarritoById(id)
    res.json(respuesta)

})


router.get('/:id/productos', async (req, res) => {

    let id = req.params.id
    let arrayCarrito = await carrito.getCarrito(id)
    res.json(arrayCarrito.productos)
})


router.post('/:id/productos',async (req, res) => {
    let idCarrito = req.params.id
    let producto = (req.body);
    respuesta = await carrito.agregarCarrito(idCarrito,producto)
    res.json(respuesta)

})


router.delete('/:id/productos/:id_prod',async (req, res) => {
    let idCarrito = req.params.id
    let idProd = req.params.id_prod;
    respuesta = await carrito.deleteProdCarrito(idCarrito,idProd)
    res.json(respuesta)

})



module.exports = router;