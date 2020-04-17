const init = db => {
  const router = require('express').Router();
  const categories = require('../../controllers/categories')(db);

  //router.get('/:slug/:id/', categories.getCategories(db));
  router.get('/', categories.adminGetCategories);
  //require.get('/', (rea, res) => res.send('Foi'));
  //router.get('/:id/', categories.getSubCategories(db));
  router.get('/nova', categories.adminCreateCategory);
  router.post('/nova', categories.adminCreateCategory);

  router.get('/excluir/:id', categories.adminRemoveCategory);
  router.get('/editar/:id', categories.adminUpdateCategory);
  router.post('/editar/:id', categories.adminUpdateCategory);

  return router;
};

module.exports = init;
