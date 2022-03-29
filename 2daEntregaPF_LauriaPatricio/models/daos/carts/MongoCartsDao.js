const { Schema } = require('mongoose');
const MongoContainer = require('../../containers/MongoContainer');

const collection = 'carts';

const cartsSchema = new Schema({
  id: { type: String, required: true },
  timestamp: { type: Date, min: Date.now() },
  products: { type: Array }
});

class MongoCartsDao extends MongoContainer {
  constructor() {
    super(collection, cartsSchema);
  }
}

module.exports = MongoCartsDao;