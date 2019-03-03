const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const { initDb, Category, Product, syncAndSeed } = require('./db');
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/categories', (req, res, next) => {
  Category.findAll({ include: [{ model: Product }] })
    .then(categories => res.send(categories))
    .catch(next);
});

app.post('/api/categories', (req, res, next) => {
  Category.createFakeCategory()
    .then(() => res.sendStatus(201))
    .catch(next);
});

app.post('/api/categories/:id/products', (req, res, next) => {
  Product.createFakeProduct(req.params.id)
    .then(() => res.sendStatus(201))
    .catch(next);
});

app.delete('/api/categories/:id', (req, res, next) => {
  Product.destroy({ where: { categoryId: req.params.id } })
    .then(Category.destroy({ where: { id: req.params.id } }))
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/products/:id', (req, res, next) => {
  Product.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});

//Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internet server error');
});

initDb().then(() =>
  app.listen(port, () => console.log(`Listening on port ${port}`))
);
