const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const category = require('./models/category');
const product = require('./models/product');

const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'devshop'
  }
});

db.on('query', query => {
  console.log('SQL: :', query.sql);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const categories = await category.getCategories(db)();
  res.render('./home', { categories });
});

app.get('/categoria/:id/:slug', async (req, res) => {
  const categories = await category.getCategories(db)();
  const products = await product.getPtoductsByCategoryId(db)(req.params.id);
  const cat = await category.getCategoryById(db)(req.params.id);

  //console.log(products);
  res.render('category', {
    products,
    categories,
    category: cat
  });
});
app.listen(port, err => {
  if (err) {
    console.log('Não foi possível iniciar o servidor');
  } else {
    console.log('DevShop server radando....');
  }
});
