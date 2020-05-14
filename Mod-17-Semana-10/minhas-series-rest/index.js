const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const series = require('./routes/series');
const users = require('./routes/users');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const jwtSecret = 'abc123abc123abc123';
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin === 'http://server2:8080') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;
const url =
  'mongodb+srv://intro:w0bstb@cluster0-0wtrb.mongodb.net/minhas-series-rest?retryWrites=true&w=majority';
const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
const mongo = process.env.MONGODB || url;

// app.get('/series', (req, res) => {
//   res.send(series);
// });

app.use('/series', series);
app.use('/users', users);

app.post('/auth', async (req, res) => {
  const user = req.body;
  const userDb = await User.findOne({ username: user.username });
  if (userDb) {
    if (userDb.password === user.password) {
      const payload = {
        id: userDb._id,
        username: userDb.username,
        roles: userDb.roles,
      };
      console.log(payload);
      jwt.sign(payload, jwtSecret, (err, token) => {
        res.send({
          success: true,
          token: token,
        });
      });
    } else {
      res.send({ success: false, message: 'Wrong credential.' });
    }
  } else {
    res.send({ success: false, message: 'Wrong credential.' });
  }
});

const createInitialUsers = async () => {
  const total = await User.countDocuments({});
  if (total === 0) {
    const user = new User({
      username: 'hallan',
      password: 'teste',
      roles: ['restrito', 'admin'],
    });
    await user.save();

    const user2 = new User({
      username: 'restrito',
      password: 'teste',
      roles: ['restrito'],
    });
    await user2.save();
  }
};

mongoose
  .connect(mongo, options)
  .then(() => {
    createInitialUsers();
    app.listen(port, () => console.log('Listening...'));
  })
  .catch((e) => console.log(e));
