const express = require('express');
const router = express.Router();
const Noticia = require('../models/noticias');

router.use((req, res, next) => {
  if ('user' in req.session) {
    if (req.session.user.roles.indexOf('restrito') >= 0) {
      return next();
    } else {
      res.redirect('/');
    }
  }
  res.redirect('/login');
});

router.get('/', (req, res) => {
  res.send('Área Restrita');
});

router.get('/noticias', async (req, res) => {
  let conditions = { category: 'privada' };
  const noticias = await Noticia.find(conditions);
  res.render('noticias/restrito', { noticias });
});

module.exports = router;
