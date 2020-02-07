const express = require('express');
const projetosController = require('../controllers/projetos');

const projetosRouter = ({ connection }) => {
  const router = express.Router();

  router.get('/', projetosController.index.bind(null, connection));

  return router;
};

module.exports = projetosRouter;
