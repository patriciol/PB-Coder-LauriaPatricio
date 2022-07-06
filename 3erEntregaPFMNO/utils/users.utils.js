
const formatUserForDB = (userObj) => {

  const newUser = {
    email: userObj.email,
    password: userObj.password,
    nombre: userObj.nombre,
    direccion: userObj.direccion,
    edad: userObj.edad,
    phone: userObj.phone,
    
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}