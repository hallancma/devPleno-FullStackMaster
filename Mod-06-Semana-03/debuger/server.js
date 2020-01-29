const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log(req.query);
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Servidor ligado!');
});
