const express = require('express');
const app = express();
const port = process.env.port || 80;
const bodyParser = require('body-parser');
const cors = require('cors');

const parse = require('xml2js').parseString;
const Pagseguro = require('pagseguro');
const request = require('request-promise');

const dados = {
  email: 'hallancma@gmail.com',
  token: 'ABF446EA41104455A6470F85BA726FE1',
  mode: 'sandbox',
};
app.use(cors);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Pagseguro');
  console.log('Foi');
});

app.get('/pagar', (req, res) => {
  const pagseguro = new Pagseguro(dados);
  pagseguro.currency('BRL');
  pagseguro.reference('55555');
  pagseguro.addItem({
    id: 1,
    description: 'Bola Quadrada',
    amount: '12.00',
    quantity: 4,
    weight: 1,
  });

  pagseguro.setRedirectURL('http://localhost/pagok');
  pagseguro.setNotificationURL('http://localhost/pagok');
  pagseguro.send((err, pags) => {
    parse(pags, (err, js) => {
      const url =
        'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=';
      res.redirect(url + js.checkout.code);
      //console.log(js);
      //res.send(js);
    });
    //console.log(res);
  });
});
app.post('/', (req, res) => {
  res.send('foi');
});
app.post('/notify', async (req, res) => {
  const notification = req.body.notificationCode;
  const payment = await request({
    url:
      'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions/notifications/' +
      notification +
      '?email=' +
      dados.email +
      '&token=' +
      dados.token,
    method: 'get',
  });
  const paymentObj = parse(payment, (err, dados) => {
    res.send(paymentObj);
  });
  console.log('teste');
  //res.send(notification);
});

app.listen(port, () => console.log('Running....'));
