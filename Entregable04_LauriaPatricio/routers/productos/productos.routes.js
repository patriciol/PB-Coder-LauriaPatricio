const express = require('express')
const router = express.Router();

const Contenedor = require("../../contenedor");
const productos = new Contenedor('./productos.txt')


router.get('/', async (req, res) => {

    let arrayProd = await productos.getAll();
    arrayProd = JSON.stringify(arrayProd, undefined, 2)
    res.send(`<h1>Mis Productos son:</h1> <pre>${arrayProd}</pre>`)
})


router.get('/:id', async (req, res) => {

    let id = req.params.id
    let prodById = await productos.getById(id)

    prodById = JSON.stringify(prodById, undefined, 2)

    res.send(`<h1>El producto con ID ${id} es: </h1> <pre>${prodById}</pre>`)

})


router.post('/', async (req, res) => {
    const productoNuevo = (req.body);
    await productos.save(productoNuevo)
    res.json({
        resultado: 'Resultado post OK',
        agregado: productoNuevo,
        idNuevo: productoNuevo.id
    })
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params
    let arrayProd = await productos.getAll();
    
    let pos = arrayProd.findIndex(e => e.id === + id)
    
    if( pos != -1)
    {
        arrayProd.splice(pos, 1)
        await productos.actualizar(arrayProd)
        res.json({ resultado: 'resultado delete:OK' })
    }
    else
    {
        res.json({ error: 'Id no encontrado' })
    }
    
})


router.put('/:id', async (req, res) => {
    const { id } = req.params
    const productoActualizar = (req.body);
    productoActualizar.id=id

    let arrayProd = await productos.getAll();
    let pos = arrayProd.findIndex(e => e.id ===+id)
    if(pos!=-1)
    {
        arrayProd[pos] = productoActualizar
        await productos.actualizar(arrayProd)
        res.json({ resultado: 'resultado PUT OK' })
    }
    else
    {
        res.json({ error: 'Producto no encontrado' })
    }
    
})

module.exports = router;