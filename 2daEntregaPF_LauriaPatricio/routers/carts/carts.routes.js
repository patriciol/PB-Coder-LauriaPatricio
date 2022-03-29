const { Router } = require('express');

const {
  getAllCarts,
  getCartById,
  createCart,
  deleteCartById,
  addProduct,
  deleteProductByCart
} = require('../../controllers/carts.controllers');

const router = Router();

router.get('/', getAllCarts);

router.get('/:id/products', getCartById);

router.post('/', createCart);

router.post('/:id/products', addProduct);

router.delete('/:id', deleteCartById);

router.delete('/:id/products/:id_prod', deleteProductByCart);

module.exports = router;