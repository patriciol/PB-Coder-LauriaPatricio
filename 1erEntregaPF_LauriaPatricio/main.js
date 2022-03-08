const express = require('express')
const app = express()


const PORT = process.env.PORT || 8080;

app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views')
app.set('view engine', 'ejs')

const apiRoutes = require('./routers/index')


app.use('/api', apiRoutes)

app.get('/*',(req,res)=>{
    res.send({ error : -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`})
})
app.post('/*',(req,res)=>{
    res.send({ error : -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`})
})
app.delete('/*',(req,res)=>{
    res.send({ error : -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`})
})
app.put('/*',(req,res)=>{
    res.send({ error : -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`})
})


const server = app.listen(PORT, () => {
    console.log(`Servidor Actido en Puerto: ${PORT}`);
})
server.on('Error', error => console.log(error))