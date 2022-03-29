const firebaseConfig = require('./db/firebase/firebase.config.json');

module.exports = {
  ENV: {
    PORT: process.env.PORT || 8080,
    PERS: process.env.PERS || 'mongo',
  },
  DB_CONFIG: {
    mongodb: {
      uri: 'mongodb+srv://patriciolauria:1234pato@backendpl.5kgw3.mongodb.net/ecommerce?retryWrites=true&w=majority'
    },
    firebase: {
      credential: firebaseConfig,
    }
  }
}