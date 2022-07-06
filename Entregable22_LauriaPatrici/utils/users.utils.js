
const formatUserForDB = (userObj, req) => {

  const newUser = {
    email: userObj.email,
    password: userObj.password,
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    edad: req.body.edad,
    phone: req.body.phone,
    foto: req.body.foto,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}