const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const _ = require('lodash');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
  ((email, password, done) => {
    Users.findOne({email}, (err, user) => { // eslint-disable-line consistent-return
      if(err) {
        return done(err);
      }
      if(_.isEmpty(user)) {
        return done(null, false, {
          message: 'Incorrect email.',
        });
      }
      bcrypt.compare(password, user.password, (error, res) => {
        if(res) {
          return done(null, {data: user}, {
            message: 'Logged In Successfully',
          });
        }
        return done(null, false, {
          message: 'Invalid Password. If you forgot your password please contact admin.',
        });
      });
    });
  })) // eslint-disable-line comma-dangle
);

