const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('home');
});
app.listen(port, err => {
  if (err) {
    console.log('Não foi possível iniciar o servidor do Jobify');
  } else {
    console.log('Servidor do Curriculo rodando...');
  }
});
