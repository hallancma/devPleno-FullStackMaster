const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const request = require('request-promise');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', async (req, res) => {
  const validate = await request({
    method: 'post',
    uri: 'https://www.google.com/recaptcha/api/siteverify',
    formData: {
      secret: '6LciXfkUAAAAAMYr2kQcmDA3RyqmkycXT5Qaui8I',
      response: req.body['g-recaptcha-response'],
      remoteip: req.headers['x-forwar-for'] || req.connection.remoteAddress,
    },
  });
  const jsonValidade = JSON.parse(validate);
  if (jsonValidade.success) {
    res.send('tudo ok');
  } else {
    res.send('não salvar');
  }
  //console.log(validate);
  // res.send(req.body);
});

app.listen(port, () => console.log('Listening...'));
