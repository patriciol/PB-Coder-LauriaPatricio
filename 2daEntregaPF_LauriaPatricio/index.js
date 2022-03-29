const express = require('express')
const { ENV: { PORT, PERS } } = require('./config');
const apiRoutes = require('./routers/index');

const app = express();
//
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views')
app.set('view engine', 'ejs')

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto:${PORT} y metodo utilizado:${PERS}`);
});
server.on('Error', error => console.log(error))