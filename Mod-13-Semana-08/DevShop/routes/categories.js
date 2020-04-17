const init = db => {
  const router = require('express').Router();
  const categories = require('../controllers/categories')(db);

  router.get('/:slug/:id/', categories.getCategories);
  //router.get('/:id/', categories.getSubCategories(db));

  return router;
};

module.exports = init;
