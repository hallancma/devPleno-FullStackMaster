const express = require('express');
const router = express.Router();
const Noticia = require('../models/noticias');

router.get('/', async (req, res) => {
  let conditions = {};
  conditions = { category: 'public' };
  const noticias = await Noticia.find(conditions);
  res.render('noticias/index', { noticias });
});

module.exports = router;
