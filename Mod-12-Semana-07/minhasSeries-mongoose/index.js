const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pages = require('./routes/pages');
const series = require('./routes/series');
const port = process.env.PORT || 3000;
const urlDB =
  'mongodb+srv://intro:w0bstb@cluster0-0wtrb.mongodb.net/minhas_series?retryWrites=true&w=majority';
const mongo = process.env.MONGODB || urlDB;

const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true
};

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//process request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', pages);
app.use('/series', series);

mongoose
  .connect(mongo, options)
  .then(() => {
    app.listen(port, () => console.log('Listening on: ' + port));
  })
  .catch(e => {
    console.log(e);
  });
