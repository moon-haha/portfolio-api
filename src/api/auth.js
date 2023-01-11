const auth = require('express').Router();
const passport = require('passport');

const bcrypt = require('bcrypt');

//auth login page
auth.get('/login', function (req, res) {
  res.send('login page');
});

auth.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/api/auth' }),
  function (req, res) {
    res.redirect('/api/auth/mypage');
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
  req.app.databaseName;
  var pw = req.body.pw;
  bcrypt.genSalt(17, function (err, salt) {
    bcrypt.hash(pw, salt, function (err, hash) {
      // Store hash in your password DB.
      //Register
      req.app.databaseName
        .collection('login')
        .insertOne({ id: req.body.id, pw: hash }, function () {
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

module.exports = auth;
