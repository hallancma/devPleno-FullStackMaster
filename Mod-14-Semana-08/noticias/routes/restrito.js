const express = require('express');
const router = express.Router();
const Noticia = require('../models/noticias');

router.use((req, res, next) => {
  // console.log(req.user);
  // if ('user' in req.session) {
  if (req.isAuthenticated()) {
    if (req.user.roles.indexOf('restrito') >= 0) {
      // console.log('1');
      return next();
    } else {
      // console.log('2');
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
