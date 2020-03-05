const init = db => {
  const home = require('../controllers/home');
  const categories = require('./categories');
  const products = require('./products');
  const router = require('express').Router();

  router.use('/categoria', categories(db));
  router.use('/produto', products(db));
  router.use('/', home.getIndex);
  return router;
};

module.exports = init;
