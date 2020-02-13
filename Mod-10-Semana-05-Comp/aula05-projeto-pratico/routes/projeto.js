const express = require('express');
const projetosController = require('../controllers/projetos');
const router = express.Router();

router.get('/', projetosController.index);

module.exports = router;
