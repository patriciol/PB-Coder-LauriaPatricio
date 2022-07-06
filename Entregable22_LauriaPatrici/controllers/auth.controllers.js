const nodemailer = require('nodemailer');
const TEST_MAIL = 'noe.schmeler5@ethereal.email'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'noe.schmeler5@ethereal.email',
    pass: 'jZ14gnZXTR2A2bWXRX'
  }
});


const register = async (req, res, next) => {
  const userEmail = await req.user.email;
  const userPhone = await req.user.phone;
  const userNombre = await req.user.nombre;
  const userDireccion = await req.user.direccion;
  const userEdad = await req.user.edad;

  try {
    const mailOptions = {
      from: 'Servidor Node.js',
      to: TEST_MAIL,
      subject: 'Nuevo Registro',
      html: `<p>Email:${userEmail}</p>
      <p>Nombre:${userNombre}</p>
      <p>Direccion:${userDireccion}</p>
      <p>Edad:${userEdad}</p>
      <p>Telefono:${userPhone}</p>
     `
    }

    const info = await transporter.sendMail(mailOptions)
  } catch (error) {
  }

  res.redirect('/profile');

}

const login = async (req, res, next) => res.redirect('/profile');


module.exports = {
  login,
  register
}