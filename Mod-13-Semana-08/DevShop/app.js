const init = db => {
  const express = require('express');
  const app = express();

  const category = require('./models/category');
  const routes = require('./routes');
  const bodyParser = require('body-parser');
  const session = require('express-session');

  app.use(bodyParser.json({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    session({
      secret: 'MyDevShopRulez!',
      name: 'sessionId',
      resave: false,
      saveUninitialized: false
    })
  );

  app.set('view engine', 'ejs');
  app.use(express.static('public'));

  //middleware
  app.use(async (req, res, next) => {
    const categories = await category.getCategories(db)();
    const { user } = req.session;
    // const subCategorias = await category.getSubCategories(db)(2);
    const subCategorias = async menuID =>
      await category.getSubCategories(db)(menuID);

    //s return teste;

    res.locals = {
      categories,
      subCategorias,
      user
    };
    next();
    //res.send('auth');
  });

  app.use(routes(db));
  return app;
};

module.exports = init;
