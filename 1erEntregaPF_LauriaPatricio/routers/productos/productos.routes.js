const express = require('express')
const router = express.Router();
const Contenedor = require("../../contenedor");
const productos = new Contenedor("./productos.txt")
const autMiddleware = require('../../middleware/authorizer')



router.get('/', async (req, res) => {
    let arrayProd = await productos.getAll();
let admin=req.admin;
    res.render('productos',{arrayProd})

})

router.get('/:id', async (req, res) => {
    let id = req.params.id
    let prodById = await productos.getById(id)
    res.render('detalle',{prodById})
})

router.post('/', autMiddleware, async (req, res) => {
    const productoNuevo = (req.body);
    await productos.save(productoNuevo)
    res.redirect('/api/productos')

})

router.put('/:id', autMiddleware, async (req, res) => {
    const { id } = req.params
    const productoActualizar = (req.body);

    productoActualizar.id = +id

    let arrayProd = await productos.getAll();
    let pos = arrayProd.findIndex(e => e.id === +id)
    if (pos != -1) {
        arrayProd[pos] = productoActualizar
        await productos.actualizar(arrayProd)
        res.json({ resultado: 'resultado PUT OK' })
    }
    else {
        res.json({ error: 'Producto no encontrado' })
    }

})

router.delete('/:id', autMiddleware, async (req, res) => {
    const { id } = req.params
    let arrayProd = await productos.getAll();

    let pos = arrayProd.findIndex(e => e.id === + id)
    if (pos != -1) {
        arrayProd.splice(pos, 1)
        await productos.actualizar(arrayProd)
        res.json({ resultado: 'resultado delete:OK' })
    }
    else {
        res.json({ error: 'Id no encontrado' })
    }

})

module.exports = router;