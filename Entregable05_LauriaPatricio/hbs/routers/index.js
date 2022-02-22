const express=require('express')
const productosRoutes=require('./productos/productos.routes')


const router=express.Router();

router.use(express.json())
router.use(express.urlencoded({ extended: true }));




router.use('/productos',productosRoutes)




module.exports=router;