const express = require('express')

const app = express();

const PORT = process.env.PORT || 8080


app.use(express.static('./public'))
const apiRoutes=require('./routers/index')

app.use('/api',apiRoutes)



const server = app.listen(PORT, () => {
    console.log(`Servidor activo ${PORT}`)
})
server.on("eror", error => console.log(error))