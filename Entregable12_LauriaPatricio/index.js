const fs = require('fs/promises');
const express = require('express');
const session = require('express-session');
const app = express();


const { generateArray } = require('./utils/index');
const Contenedor = require("./contenedor.js");
const mensajes = new Contenedor('./mensajes.txt')


const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: 'my-session',
  secret: 'top-secret-51',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000,
  }
}));

// Template engines
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'))

// Routes
app.listen(PORT, () => {
  console.log('Server is up and running on port: ', PORT);
});

app.get('/login', async (req, res) => {
  const user = await req.session.user;
  if (user) {

    return res.redirect('/');
  }
  else {
    return res.sendFile(__dirname + '/public/login.html');
  }

});

app.get('/', async (req, res) => {
  const user = await req.session.user;
  if (user) {
    const arrayMensajes = await mensajes.getAll()

    const arrayProd = await generateArray(5)
    return res.render('profile', { user, arrayMensajes, arrayProd })
  }
  else {

    return res.sendFile(__dirname + '/public/login.html');

  }
});

app.get('/logout', async (req, res) => {
  const user = await req.session.user;

  if (user) {
    try {
      req.session.destroy(err => {
        if (err) {
          console.log(err);
          res.clearCookie('my-session');
        }
        else {
          res.clearCookie('my-session');
          res.render('logout', { user });

        }
      })
    }
    catch (err) {
      console.log(err);
    }
  }
  else {
    console.log("HAY QUE LOGUEARSE")
    return res.sendFile(__dirname + '/public/login.html');
  }

});

app.post('/login', (req, res) => {
  const { nombre } = req.body;
  req.session.user = nombre;
  res.redirect('/');
});







