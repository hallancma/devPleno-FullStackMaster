const express = require('express');
const pessoasController = require('../controllers/pessoas');

const pessoasRouter = ({ connection }) => {
  const router = express.Router();

  router.get('/', pessoasController.index.bind(null, connection));
  router.get('/delete/:id', pessoasController.deleteOne.bind(null, connection));
  router.get('/create', pessoasController.createPessoa);
  router.post(
    '/create',
    pessoasController.createProcess.bind(null, connection)
  );
  router.get(
    '/update/:id',
    pessoasController.updatePessoa.bind(null, connection)
  );
  router.post(
    '/update/:id',
    pessoasController.updateProcess.bind(null, connection)
  );
  return router;
};

module.exports = pessoasRouter;
