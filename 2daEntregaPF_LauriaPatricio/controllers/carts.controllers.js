const { CartsDao } = require('../models/daos/index');

const cartsDao = new CartsDao();


const getAllCarts = async (req, res, next) => {
  try {
    const carts = await cartsDao.getAll();
    //res.json({ success: true, carts });
    let arrayCarts = JSON.stringify(carts, undefined, 2)
    res.send(`<h1>Carts:</h1> <pre>${arrayCarts}</pre>`)

  }
  catch (error) {
    next(error);
  }
};

const getCartById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const carts = await cartsDao.getById(id);
    //res.json({ success: true, carts });
    let arrayCarts = JSON.stringify(carts, undefined, 2)
    res.send(`<h1>Cart by id:</h1> <pre>${arrayCarts}</pre>`)
  }
  catch (error) {
    next(error);
  }
};

const createCart = async (req, res, next) => {
  try {
    const newCart = await cartsDao.createCart(req.body);
    res.json({ success: true, result: newCart });

  }
  catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  const { params: { id }, body } = req;
  try {
    const updatedProduct = await cartsDao.addProduct(id, body);
    res.json({ success: true, result: updatedProduct });
  }
  catch (error) {
    next(error)
  }
};

const deleteCartById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCart = await cartsDao.deleteById(id);
    res.json({ success: true, result: deletedCart });
  }
  catch (error) {
    next(error);
  }
};

const deleteProductByCart = async (req, res, next) => {
  const { id, id_prod } = req.params;
  try {
    const deletedCart = await cartsDao.deleteProductByCart(id, id_prod);
    res.json({ success: true, result: deletedCart });
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  deleteCartById,
  addProduct,
  deleteProductByCart

}