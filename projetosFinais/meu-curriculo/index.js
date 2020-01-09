const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('home');
});

app.listen(3000, err => {
  if (err) {
    console.log('Não foi possível iniciar o servidor do Jobify');
  } else {
    console.log('Servidor do Curriculo rodando...');
  }
});
