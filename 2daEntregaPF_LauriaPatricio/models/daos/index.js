const { ENV: { PERS } } = require('../../config');

let ProductsDao;
let CartsDao;

switch (PERS) {
  case 'firebase':
    ProductsDao = require('./products/FirebaseProductsDao');
    CartsDao = require('./carts/FirebaseCartsDao');
    break;

  case 'mongo':
    ProductsDao = require('./products/MongoProductsDao');
    CartsDao = require('./carts/MongoCartsDao');
    break;


  case 'file':
    ProductsDao = require('./products/FileProductsDao');
    CartsDao = require('./carts/FileCartsDao');
    break;

  default:
    throw new Error('Metodo Invalido');
}

module.exports = {
  ProductsDao,
  CartsDao,
}