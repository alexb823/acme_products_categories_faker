const Sequelize = require('sequelize');
const faker = require('faker');

const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

//models
const Category = db.define('category', {
  name: Sequelize.STRING,
});

const Product = db.define('product', {
  name: Sequelize.STRING,
});

//association
Product.belongsTo(Category);
Category.hasMany(Product);

//Class methods
Category.createFakeCategory = function() {
  return Category.create({ name: faker.commerce.department() });
};

Product.createFakeProduct = function(categoryId) {
  return Product.create({ name: faker.commerce.productName(), categoryId });
};

const initDb = () => {
  return db
    .sync()
    .then(() => console.log('db synced'))
    .catch(err => console.error(err));
};


//Below methods are for seeding db with some data to test the back end
//Not used in the deployed app
const createCtgNames = (count = 2) => {
  const categoryNames = [];
  while (categoryNames.length < count) {
    categoryNames.push(faker.commerce.department());
  }
  return categoryNames;
};

const createPrdNames = (count = 2) => {
  const productNames = [];
  while (productNames.length < count) {
    productNames.push(faker.commerce.productName());
  }
  return productNames;
};

const syncAndSeed = () => {
  return db
    .sync({ force: true })
    .then(() => createCtgNames())
    .then(categoryNames => {
      return Promise.all(categoryNames.map(name => Category.create({ name })));
    })
    .then(([cat1, cat2]) => {
      return Promise.all([
        Promise.all(
          createPrdNames().map(name =>
            Product.create({ name, categoryId: cat1.id })
          )
        ),
        Promise.all(
          createPrdNames().map(name =>
            Product.create({ name, categoryId: cat2.id })
          )
        ),
      ]);
    })
    .catch(err => console.err(err));
};

module.exports = {
  initDb,
  syncAndSeed,
  Category,
  Product,
};
