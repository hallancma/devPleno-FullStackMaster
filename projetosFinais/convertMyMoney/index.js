const express = require('express');
const app = express();
const path = require('path');
const convert = require('./lib/convert');
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/cotacao', (req, res) => {
  const { cotacao, quantidade } = req.query;
  if (convert.isNumber(cotacao) && convert.isNumber(quantidade)) {
    const conversao = convert.convert(cotacao, quantidade);
    res.render('cotacao', {
      error: false,
      conversao: convert.toManey(conversao),
      cotacao: convert.toManey(cotacao),
      quantidade: convert.toManey(quantidade)
    });
  } else {
    res.render('cotacao', {
      error: 'Valores inválidos'
    });
  }
});

app.listen(port, err => {
  if (err) {
    console.log('Não foi possível inicial o servidor!');
  } else {
    console.log('ConvertMyMoney esta online!');
  }
});
