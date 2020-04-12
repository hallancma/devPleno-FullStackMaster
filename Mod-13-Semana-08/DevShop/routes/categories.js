const init = db => {
  const router = require('express').Router();
  const categories = require('../controllers/categories');

  router.get('/:slug/:id/', categories.getCategories(db));
  //router.get('/:id/', categories.getSubCategories(db));

  return router;
};

module.exports = init;
