const Sequelize = require('sequelize');
const faker = require('faker');

const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

const Category = db.define('category', {
  name: Sequelize.STRING,
});

const Product = db.define('product', {
  name: Sequelize.STRING,
});

Product.belongsTo(Category);
Category.hasMany(Product);

const createCategoryNames = (count = 2) => {
  const categoryNames = [];
  while (categoryNames.length < count) {
    categoryNames.push(faker.commerce.department());
  }
  return categoryNames;
};

const createProductNames = (count = 2) => {
  const productNames = [];
  while (productNames.length < count) {
    productNames.push(faker.commerce.productName());
  }
  return productNames;
};

const syncAndSeed = () => {
  return db
    .sync({ force: true })
    .then(() => createCategoryNames())
    .then(categoryNames => {
      return Promise.all(categoryNames.map(name => Category.create({ name })));
    })
    .then(([cat1, cat2]) => {
      return Promise.all([
        Promise.all(
          createProductNames().map(name =>
            Product.create({ name, categoryId: cat1.id })
          )
        ),
        Promise.all(
          createProductNames().map(name =>
            Product.create({ name, categoryId: cat2.id })
          )
        ),
      ]);
    })
    .catch(err => console.err(err))
};

module.exports = {
  syncAndSeed,
}
