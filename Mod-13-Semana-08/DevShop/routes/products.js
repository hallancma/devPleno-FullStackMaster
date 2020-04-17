const init = db => {
  const router = require('express').Router();
  const products = require('../controllers/products')(db);

  router.get('/:slug/:id/', products.getProduct);

  return router;
};

module.exports = init;
