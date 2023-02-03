const auth = require('express').Router();
const passport = require('passport');

const bcrypt = require('bcryptjs');

//auth login page
auth.get('/login', function (req, res) {
  res.send('login page');
});

auth.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  },
);

function isLogged(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}

auth.post('/register', function (req, res) {
  //DB Client 연결
  var pw = req.body.pw;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(pw, salt, function (err, hash) {
      // Store hash in your password DB.
      //Register
      req.app.databaseName
        .collection('login')
        .insertOne({ id: req.body.id, pw: hash }, function () {
          //console.log(result);
          res.redirect('/');
        });
    });
  });
});

// - myPage
auth.get('/mypage', isLogged, function (req, res) {
  //로그인 했는지 체크
  //console.log(req.user.id);
  res.send(`hi ${req.user._id}`);
});

//logout
auth.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = auth;
