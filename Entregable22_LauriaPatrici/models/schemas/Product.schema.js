const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  nombre: {
    type: String  },
  descripcion: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  createdAt: { type: Date, required: true }
});

module.exports = ProductSchema;
