const faker = require('faker');

const { commerce, image } = faker;

const generateArray = (num) => {
    const array = [];
    for (let i = 1; i <= num; i++) {
        array.push({
            producto: commerce.product(),
            precio: commerce.price(),
            url: faker.image.animals(50, 50, true)
        })
    }
    return array;
};

module.exports = {
    generateArray,
}