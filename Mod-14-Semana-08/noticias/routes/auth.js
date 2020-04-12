const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (user) {
      console.log(user);
      const isValid = await user.checkPassword(password);
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } else {
      return done(null, false);
    }
  })
);

passport.use(
  new FacebookStrategy(
    {
      clientID: '1310816789115242',
      clientSecret: '3c505b1a8df304c870b36172670afd64',
      callbackURL: 'http://localhost:3000/facebook/callback',
      profileFields: ['id', 'displayName', 'email', 'photos']
    },
    async (accessToken, refreshToken, profile, done) => {
      const userDB = await User.findOne({ facebookId: profile.id });
      if (!userDB) {
        const user = new User({
          name: profile.displayName,
          facebookId: profile.id,
          roles: ['restrito']
        });
        await user.save();
        done(null, user);
      } else {
        done(null, userDB);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '648386664014-8hnfsg30r9npr8chgcc05d0mskom8mn9.apps.googleusercontent.com',
      clientSecret: 'sJgbdbeuxZ00OSSFn_GhGnXS',
      callbackURL: 'http://localhost:3000/google/callback'
    },
    async (accessToken, refreshToken, error, profile, done) => {
      const userDB = await User.findOne({ googleId: profile.id });
      if (!userDB) {
        const user = new User({
          name: profile.displayName,
          googleId: profile.id,
          roles: ['restrito']
        });
        await user.save();
        done(null, user);
      } else {
        done(null, userDB);
      }
    }
  )
);

router.use((req, res, next) => {
  //if ('user' in req.session) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    if (!req.session.role) {
      req.session.role = req.user.roles[1];
    }
    res.locals.role = req.session.role;
  }
  next();
});

router.get('/change-role/:role', (req, res) => {
  //if ('user' in req.session) {
  if (req.isAuthenticated()) {
    if (req.user.roles.indexOf(req.params.role) >= 0) {
      req.session.role = req.params.role;
    }
  }
  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.app.locals.user = '';
    res.redirect('/');
  });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    successFlash: false
  })
);

router.get('/facebook', passport.authenticate('facebook'));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/'
  })
);

// router.post('/login', async (req, res) => {
//   const user = await User.findOne({ username: req.body.username });

//   if (user) {
//     const isValid = await user.checkPassword(req.body.password);

//     if (user && isValid) {
//       req.session.user = user;
//       req.session.role = user.roles[0];
//       res.redirect('/restrito/noticias');
//     } else {
//       res.redirect('/login');
//     }
//   } else {
//     res.redirect('/login');
//   }

//   // res.send({
//   //   user,
//   //   isValid
//   // });
// });

module.exports = router;
