const path = require('path');
const express = require('express');
const apiRoutes = require('./api/api.routes');
const auth = require('../middlewares/auth');
const authControllers = require('../controllers/auth.controllers');
const twilio = require('twilio')
const router = express.Router();
const productsSchema = require('../models/schemas/Product.schema')
const MongoDBContainer = require('../models/containers/Mongodb.container');
const productsContainer = new MongoDBContainer('productos', productsSchema)
const cartSchema = require('../models/schemas/Cart.schema')
const cartContainer = new MongoDBContainer('carts', cartSchema)
const nodemailer = require('nodemailer');
const { formatProductForDB } = require("../utils/cart.utils")

router.use('/api', apiRoutes);

const accountSid = 'ACe9aaeacf272c4b381a351c8c3e8f72f2'
const authToken = '076259045f89db4f08db0b790b7573b6'
const client = twilio(accountSid, authToken)
const TEST_MAIL = 'noe.schmeler5@ethereal.email'
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'noe.schmeler5@ethereal.email',
    pass: 'jZ14gnZXTR2A2bWXRX'
  }
});



router.get('/', async (req, res) => {
  const user = await req.user;
  if (user) {

    res.redirect('/profile')
  }
  else {
    return res.sendFile(path.resolve(__dirname, '../public/login.html'));
  }
});


router.get('/register', async (req, res) => {

  const user = await req.user;
  if (user) {
    const arrayMensajes = await mensajes.getAll()
    const arrayProd = await generateArray(5)
    res.redirect('/profile')
  }
  else {
    return res.render('register')
  }

});


router.get('/productos', auth, async (req, res) => {
  const productos = await productsContainer.getAll()
  res.render('productos', { productos })
})

router.post('/productos/cart', async (req, res) => {
  const producto = await productsContainer.getById(req.body.id)
  const carrito = await cartContainer.getCartByUser(req.user.id)
  const productoCar = formatProductForDB(producto)
  if (carrito) {
    await cartContainer.addProduct(req.user.id, productoCar)
  }
  else {
    await cartContainer.createCart(productoCar, req.user.id)
  }
})

router.get('/cart', auth, async (req, res) => {
  const user = await req.user.id;
  const carritos = await cartContainer.getCartByUser(user)
  res.render('carritos', { carritos })
});

router.post('/cart', async (req, res) => {
  const userEmail = await req.user.email;
  const carritos = await req.body
  try {
    const mailOptions = {
      from: 'Servidor Node.js',
      to: TEST_MAIL,
      subject: `nuevo pedido de ${userEmail}`,
      html: `<p>Carrito Numero:${carritos}</p>
      `
    }
    const info = await transporter.sendMail(mailOptions)
  } catch (error) {
  }

  try {
    const message = await client.messages.create({
      body: 'Su pedido fue procesado',
      from: '+19206968415',
      to: '+541122513099'
    })
  } catch (error) {
  }
  await cartContainer.deleteById(req.body)
});


router.get('/profile', auth, async (req, res) => {
  const userEmail = await req.user.email;
  const userPhone = await req.user.phone;
  const userNombre = await req.user.nombre;
  const userDireccion = await req.user.direccion;
  const userEdad = await req.user.edad;
  const userFoto = await req.user.foto;

  return res.render('profile', { userEmail, userFoto, userPhone, userNombre, userDireccion, userEdad })
});

router.get('/logout', auth, (req, res, next) => {
  req.logOut();
  console.log('User logued out!');
  res.redirect('/');
});

router.get('/login-error', async (req, res) => {
  const error = 'USER ERROR LOGIN'
  return res.render('error', { error })
})

router.get('/register-error', async (req, res) => {
  const error = 'USER ERROR SINGUP'
  return res.render('error', { error })
})

module.exports = router;