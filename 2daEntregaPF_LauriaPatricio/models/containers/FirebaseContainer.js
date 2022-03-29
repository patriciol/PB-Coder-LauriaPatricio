const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const { DB_CONFIG } = require('../../config');
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

class FirebaseContainer {
  constructor(coll) {
    this.connect();
    const db = getFirestore();
    this.query = db.collection(coll);
  }

  connect() {

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(DB_CONFIG.firebase.credential)
      });
    }

    console.log('Connected to Firestore!');
  }

  async getAll() {
    const docRef = await this.query.get();
    const documents = docRef.docs;
    return documents.map(document => ({
      id: document.id,
      ...document.data()
    }))
  }

  async getById(id) {
    const docRef = this.query.doc(id);
    if (!docRef) {
      throw new Error('[NOT_FOUND]No existe el ID');
    }
    const document = await docRef.get();
    return document.data();
  }

  async save(payload) {
    const docRef = this.query.doc();
    return await docRef.set(payload);
  }

  async updateById(id, payload) {
    const docRef = this.query.doc(id);
    if (!docRef) {
      throw new Error('[NOT_FOUND]No existe el ID!');
    }
    return await docRef.update(payload);
  }

  async deleteById(id) {
    const docRef = this.query.doc(`${id}`);
    return await docRef.delete();
  }

  async createCart(productosAgregar) {
    const querySnapshot = await this.query.get()
    let docs = querySnapshot.docs;
    let idMayor = 0
    docs.forEach(doc => {
      if (doc.id > idMayor) {
        idMayor = +doc.id
      }
    })
    idMayor = +idMayor + 1
    const docRef = this.query.doc(`${idMayor}`);

    if (Object.entries(productosAgregar).length > 0) {
      await docRef.create({ productos: [{ ...productosAgregar }], timestamp: hoy.toLocaleDateString() });
    }
    else {
      await docRef.create({ productos: [], timestamp: hoy.toLocaleDateString() });
    }

  }

  async addProduct(id, product) {

    const doc = this.query.doc(`${id}`)
    const item = await doc.get()
    const response = item.data();
    await doc.update({ products: [...response.products, product] })

  }

  async deleteProductByCart(idCart, idProd) {

    const doc = this.query.doc(`${idCart}`)
    const item = await doc.get()
    const response = item.data();
    let posicion = response.products.findIndex(producto => producto.id == idProd)
    if (posicion >= 0) {
      response.products.splice(posicion, 1)
    }
    await doc.update({ products: response.products })

  }

}

module.exports = FirebaseContainer;