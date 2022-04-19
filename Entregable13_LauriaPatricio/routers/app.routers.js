const path = require('path');
const express = require('express');
const apiRoutes = require('./api/api.routes');
const auth = require('../middlewares/auth');

const router = express.Router();
const { generateArray } = require('../utils/index');
const Contenedor = require("../contenedor");
const mensajes = new Contenedor('./mensajes.txt')

//Routes
router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  const user = await req.user ;
  if (user) {
    const arrayMensajes = await mensajes.getAll()

    const arrayProd = await generateArray(5)
    return res.render('profile', { user, arrayMensajes, arrayProd })

  }
  else {
    return res.sendFile(path.resolve(__dirname, '../public/login.html'));
  }
});

router.get('/profile', auth, async (req, res) => {
  const user = await req.user.email;
  const arrayMensajes = await mensajes.getAll()
  const arrayProd = await generateArray(5)
  return res.render('profile', { user, arrayMensajes, arrayProd })
});

router.get('/logout', auth, (req, res, next) => {
  req.logOut();
  console.log('User logued out!');
  res.redirect('/');
});

router.get('/login-error', async (req, res) => {
  const error ='USER ERROR LOGIN'
  return res.render('error',{error})
})

router.get('/register-error', async (req, res) => {
  const error ='USER ERROR SINGUP'
  return res.render('error',{error})
})




module.exports = router;