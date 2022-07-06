const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  id: { type: Number },
  user: {
    type: String,
    required: true
  },
  products: { type: Array }

});

module.exports = CartSchema;
