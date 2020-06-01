const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3000;
const User = require('./models/user');
mongoose.Promise = global.Promise;
const session = require('express-session');
const FB = require('fb');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use(session({ secret: 'fullstack' }));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.render('index'));
app.get('/friends', async (req, res) => {
  if (req.isAuthenticated()) {
    FB.setAccessToken(req.user.accessToken);
    FB.options({ version: 'v7.0' });
    const results = await FB.api('/100051545018291/friends', 'GET');
    res.render('friends', {
      results,
    });
  } else {
    res.redirect('/facebook');
  }
});

const url =
  'mongodb+srv://intro:w0bstb@cluster0-0wtrb.mongodb.net/facebook-app?retryWrites=true&w=majority';
const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
const mongo = process.env.MONGODB || url;

passport.use(
  new FacebookStrategy(
    {
      clientID: '1310816789115242',
      clientSecret: '3c505b1a8df304c870b36172670afd64',
      callbackURL: 'http://localhost:3000/facebook/callback',
      profileFields: ['id', 'displayName', 'email', 'photos'],
      scope: ['user_friends'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const userDb = await User.findOne({ facebookId: profile.id });
      if (!userDb) {
        const user = new User({
          name: profile.displayName,
          facebookId: profile.id,
          accessToken,
        });
        await user.save();
        done(null, user);
      } else {
        done(null, userDb);
      }
    }
  )
);

app.get('/facebook', passport.authenticate('facebook'));
app.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
);

mongoose
  .connect(mongo, options)
  .then(() => {
    app.listen(port, () => console.log('Listening...'));
  })
  .catch((e) => console.log(e));
