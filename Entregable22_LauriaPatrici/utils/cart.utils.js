
const formatProductForDB = (userObj, req) => {

  const newProductoCart = {
    
    idProd: userObj._id,
    cantidad: 1,
    nombre: userObj.nombre,
    precio: userObj.precio
  };
  return newProductoCart;
};

module.exports = {
  formatProductForDB,
}


/*
const newProductoCart = {
  idProd: userObj._id,
  cantidad: 1,
  user: req.body.id,
  nombre: userObj.nombre,
  precio: userObj.precio,
  createdAt: new Date(),
};*/