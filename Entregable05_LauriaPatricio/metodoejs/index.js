const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080

const path=require('path')

const Contenedor = require("./contenedor");
const productos = new Contenedor('./productos.txt')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//EJS
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/',async (req,res)=>{

    let arrayProd = await productos.getAll();
    const hayProd = arrayProd.length > 0
    res.render('index')
})

app.post('/productos',async (req,res)=>{
    await productos.save(req.body)
    res.redirect('/')
    
})
app.get('/productos',async (req,res)=>{
    let arrayProd = await productos.getAll();
    const hayProd = arrayProd.length > 0
    res.render('vista',{arrayProd, hayProd})
})

const server = app.listen(PORT, () => {
    console.log(`Servidor activo ${PORT}`)
})
server.on("eror", error => console.log(error))