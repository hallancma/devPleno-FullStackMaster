const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const port = process.env.PORT || 3000;
const connection = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro',
    typeCast: function(field, next) {
      if (field.type == 'DATE') {
        return moment(field.string()).format('DD/MM/YYYY');
      }
      return next();
    }
  }
});

// const connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '',
//   database: 'cadastro'
// });

const dependencies = {
  connection
};
const pessoas = require('./routes/pessoas');
const projetos = require('./routes/projetos');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));
app.use('/pessoas', pessoas(dependencies));
app.use('/projetos', projetos(dependencies));

//view engibe
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port, () => console.log('CRUD listening on port'));

connection.select(err => {
  if (err) {
    console.log('Erro ao se conectar no banco de dados!');
  } else {
    app.listen(port, () => console.log('CRUD listening on port'));
  }
});
