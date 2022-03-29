const { DocumentSnapshot } = require('firebase-admin/firestore');
const mongoose = require('mongoose');
const { DB_CONFIG } = require('../../config');

class MongoContainer {
  constructor(collection, schema) {
    this.connect().then(() => console.log('Database connected!'));
    this.model = mongoose.model(collection, schema);
  }

  async connect() {
    await mongoose.connect(DB_CONFIG.mongodb.uri);
  }

  async getAll() {
    const documents = await this.model.find({}, { __v: 0 }).lean();
    return documents;
  }

  async getById(id) {
    const document = await this.model.findOne({ id: id }, { __v: 0 });
    if (!document) {
      throw new Error('[NOT_FOUND]No existe el ID!');
    }
    return document;
  }

  async save(payload) {
    const document = await this.model.find({}, { __v: 0 }).sort({ id: -1 }).limit(1);
    payload.id = parseInt(document[0].id) + 1
    const newDocument = new this.model(payload)
    return await newDocument.save();
  }

  async updateById(id, payload) {
    const updatedDocument = await this.model.updateOne({ id: id },
      {
        $set: { ...payload }
      }
    );
    if (!updatedDocument.matchedCount) {
      throw new Error('[NOT_FOUND] No existe el ID!');
    }
    return updatedDocument;
  }

  async deleteById(id) {
    return await this.model.deleteOne({ id: id });
  }

  async createCart(productosNuevo) {
    const documents = await this.model.find({}, { __v: 0 })
    let mayorId = 0;
    documents.forEach(doc => {
      if (doc.id > mayorId)
        mayorId = +doc.id
    })

    mayorId = +mayorId + 1
    await this.model.create({
      id: `${mayorId}`,
      timestamp: Date.now(),
      products: [{ ...productosNuevo }]
    })

  }

  async addProduct(id, payload) {
    const updatedDocument = await this.model.updateOne({ id: id },
      {
        $addToSet: { products: payload }
      }
    );

    if (!updatedDocument.matchedCount) {
      throw new Error('[NOT_FOUND] No existe el ID!');
    }
    return updatedDocument;
  }

  async deleteProductByCart(idCart, idProd) {

    const Document = await this.model.updateOne({ id: idCart }, {
      $pull:
      {
        products: { id: idProd }
      }
    }


    );



  }

}

module.exports = MongoContainer;