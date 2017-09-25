const passport = require('passport');
const _ = require('lodash');
const moment = require('moment');

const login = (req, res) => {
  const flashmessage = _.get(req.flash('message'), [0], undefined);
  const message = _.get(flashmessage, 'message', flashmessage);
  const emailId = req.param('email');

  passport.authenticate('local', (err, user, info) => {
    if(err) {
      res.status(500).send({code: 500, message: info.message, user});
    }
    if(!user) {
      if(req.headers.method === 'API') {
        res.status(401).send({success: false, message: info.message});
      } else {
        console.log(message);
        req.flash('message', {message: 'Invalid Credentials'});
        res.redirect('/login');
      }
    } else {
      req.logIn(user, (error) => {
        if(error) {
          console.log('err', error);
          res.status(400).send({success: false, message: 'Error ! Please try again'});
        } else {
          const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
          const sessionId = JWT.create({id: user.data.id, email: user.data.email, time: moment(), account: 'user'});
          const loginData = {email: emailId, useragent: req.headers['user-agent'], ipAddress, sessionId};
          AuthService.createLoginHistory(loginData).then((loginResult) => {
            const loginOutput = {
              token: loginResult.sessionId,
              loginTime: loginResult.createdAt,
              name: user.data.username,
              email: user.data.email,
              mobile: user.data.mobile,
              userId: user.data.id,
            };
            req.session.loginSession = loginOutput;
            if(req.headers.method === 'API') {
              res.send({success: true, message: 'Logged in Success', auth_token: sessionId});
            } else {
              res.redirect('/home');
            }
          })
            .catch((e) => {
              console.log('e-loginhistorycreate', e);
              req.flash('message', {message: 'Error ! Unable to login try again'});
              res.redirect('/login');
            });
        }
      });
    }
  })(req, res);
};

module.exports = {
  login,
};
