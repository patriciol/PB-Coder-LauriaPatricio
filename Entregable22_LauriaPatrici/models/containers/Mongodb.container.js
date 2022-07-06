
const mongoose = require('mongoose');
const { formatErrorObject } = require('../../utils/api.utils');
const constants = require('../../constants/api.constants');

const {
  STATUS: {
    INTERNAL_ERROR,
    NOT_FOUND,
    BAD_REQUEST,
  }
} = constants;

class MongoDBContainer {
  static instancia;
  constructor(collection, Schema) {
    this.model = mongoose.model(collection, Schema);
  };

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
        return document
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

  async getByUser(email) {
    try {
      const document = await this.model.findOne({ email }, { __v: 0 })
      if (!document) {
        const errorMessage = `Wrong username or password`;
        const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
        //throw new Error(JSON.stringify(newError));
      } else {
        return document;
      }
    }
    catch (error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      //throw new Error(JSON.stringify(newError));
    }
  }


  async getCartByUser(user) {
    try {
      const document = await this.model.findOne({ "user": user }, { __v: 0 })

      return document

    }
    catch (error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      //throw new Error(JSON.stringify(newError));
    }
  }



  async addProduct(id, payload) {

    await this.model.updateOne({ "user": id },
      {
        $addToSet: { products: payload }
      }
    );

  }


  async createCart(productosNuevo, req) {

    console.log(productosNuevo)
    console.log(req)

    this.model.create({
      user: req,
      products: [{ ...productosNuevo }]
    })



  }

  async deleteById(id) {
    console.log(id.id)
    await this.model.deleteOne({ "_id": id.id })
     
  }


};


module.exports = MongoDBContainer;
