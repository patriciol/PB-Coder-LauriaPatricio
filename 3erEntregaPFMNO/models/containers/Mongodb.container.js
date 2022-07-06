const mongoose = require('mongoose');

class MongoDBContainer {

  static instancia;

  constructor(collection, Schema) {
    this.connect().then(() => console.log('Database connected!'));

    this.model = mongoose.model(collection, Schema);
  };
  async connect() {
    await mongoose.connect('mongodb+srv://patriciolauria:1234pato@backendpl.5kgw3.mongodb.net/3raEntrega?retryWrites=true&w=majority');
  }

  async getAll(filter = {}) {
    try {
      const documents = await this.model.find(filter, { __v: 0 }).lean();
      return documents;
    }
    catch (error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }

  async getById(id) {
    try {
      const document = await this.model.findById(id, { __v: 0 }).lean();
      if (!document) {
        const errorMessage = `Resource with id ${id} does not exist in our records`;
        const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
        throw new Error(JSON.stringify(newError));
      } else {
        return document;
      }
    }
    catch (error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }

  async createItem(resourceItem) {
    try {
      const newItem = new this.model(resourceItem);
      await newItem.save();
      return newItem;
    }
    catch (err) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, err.message);
      throw new Error(JSON.stringify(newError));
    }
  }
}

module.exports = MongoDBContainer;
