const express = require('express');
const SeriesController = require('../controllers/series');

const router = express.Router();
const Series = require('../models/serie');
const models = {
  Series
};
router.get('/', SeriesController.index.bind(null, models));
router.get('/nova', SeriesController.novaForm);
router.post('/nova', SeriesController.novaProcess.bind(null, models));

router.get('/excluir/:id', SeriesController.excluir.bind(null, models));

router.get('/editar/:id', SeriesController.editarForm.bind(null, models));
router.post('/editar/:id', SeriesController.editarProcess.bind(null, models));

router.get('/info/:id', SeriesController.info.bind(null, models));
router.post('/info/:id', SeriesController.addComments.bind(null, models));

module.exports = router;
