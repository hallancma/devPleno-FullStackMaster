const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
const url =
  'mongodb+srv://intro:w0bstb@cluster0-0wtrb.mongodb.net/noticias?retryWrites=true&w=majority';
const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true
};
const mongo = process.env.MONGODB || url;

mongoose
  .connect(mongo, options)
  .then(() => {
    app.listen(port, () => console.log('Listening...'));
    createInitialUser();
  })
  .catch(e => console.log(e));
app.use(
  session({
    secret: 'fullstack-master',
    resave: false,
    saveUninitialized: false
  })
);
const User = require('./models/user');
const noticias = require('./routes/noticias');
const restrito = require('./routes/restrito');
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const pages = require('./routes/pages');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/noticias', noticias);
app.use('/admin', admin);

app.use(express.static('public'));

app.use('/', auth);
app.use('/', pages);

// app.use((req, res, next) => {
//   if ('user' in req.session) {
//     res.locals.user = req.session.user;
//     res.locals.role = req.session.role;
//   }
//   next();
// });

app.use('/restrito', restrito);
const createInitialUser = async () => {
  const total = await User.countDocuments({ username: 'user1' });
  if (total === 0) {
    const user1 = new User({
      username: 'user1',
      password: 'teste',
      roles: ['restrito', 'admin']
    });
    const user2 = new User({
      username: 'user2',
      password: 'teste',
      roles: ['restrito']
    });
    await user1.save(() => console.log('Usuário criado'));
    await user2.save(() => console.log('Usuário criado'));
  }
};

// const noticia = new Noticia({
//   title: 'Notícia Pública ' + new Date().getTime(),
//   content: 'content',
//   category: 'public'
// });
// noticia.save();

// const noticia2 = new Noticia({
//   title: 'Notícia Privada ' + new Date().getTime(),
//   content: 'content',
//   category: 'privada'
// });
// noticia2.save();
