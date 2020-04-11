const express = require('express');
const router = express.Router();
const Noticia = require('../models/noticias');

router.use((req, res, next) => {
  if ('user' in req.session) {
    if (req.session.user.roles.indexOf('admin') >= 0) {
      return next();
    } else {
      res.redirect('/');
    }
  }
  res.redirect('/login');
});

router.get('/', (req, res) => {
  res.send('/admin');
});

router.get('/noticias', async (req, res) => {
  //let conditions = { category: 'privada' };
  const noticias = await Noticia.find({});
  res.render('noticias/admin', { noticias });
});

module.exports = router;
