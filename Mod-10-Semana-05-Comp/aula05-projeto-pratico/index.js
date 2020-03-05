const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const model = require('./models/index.js');

const pessoas = require('./routes/pessoa');
const projetos = require('./routes/projeto');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index'));

app.use('/pessoas', pessoas);
app.use('/projetos', projetos);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

model.sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => console.log('CRUD-ORM Listening...'));
});
