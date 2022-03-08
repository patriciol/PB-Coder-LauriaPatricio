const express=require('express')
const prodRoutes=require('./productos/productos.routes')
const carritoRoutes=require('./carrito/carrito.routes')

const router=express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.use('/productos',prodRoutes)
router.use('/carrito',carritoRoutes)

module.exports=router