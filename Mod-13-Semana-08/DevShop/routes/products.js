const init = db => {
  const router = require('express').Router();
  const products = require('../controllers/products');

  router.get('/:slug/:id/', products.getProduct(db));

  return router;
};

module.exports = init;
