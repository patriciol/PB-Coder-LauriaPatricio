const { Schema } = require('mongoose');
const MongoContainer = require('../../containers/MongoContainer');

const collection = 'products';

const productsSchema = new Schema({
  id: { type: String, required: true, default: 0 },
  nombre: { type: String, required: true },
  descripcion: { type: String },
  codigo: { type: String, unique: true, required: true },
  url: { type: String },
  precio: { type: Number, min: 0, required: true },
  stock: { type: Number, min: 0, required: true },
  timestamp: { type: Date, min: Date.now() }
});

class MongoProductsDao extends MongoContainer {
  constructor() {
    super(collection, productsSchema);
  }
}

module.exports = MongoProductsDao;
