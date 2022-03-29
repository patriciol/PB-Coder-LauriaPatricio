const FirebaseContainer = require('../../containers/FirebaseContainer');

class FirebaseCartsDao extends FirebaseContainer {
  constructor() {
    super('carts');
  }
}

module.exports = FirebaseCartsDao;