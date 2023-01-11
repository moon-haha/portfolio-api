const auth = require('express').Router();
//database
const MongoClient = require('mongodb').MongoClient;
var databaseName;
const MongoURI = process.env.MONGO_URI;
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
  MongoClient.connect(MongoURI, function (err, result) {
    if (err) return console.log(err);
    //console.log('mongo connected');
    //DB 연결
    databaseName = result.db('todoapp');
    var pw = req.body.pw;
    bcrypt.genSalt(17, function (err, salt) {
      bcrypt.hash(pw, salt, function (err, hash) {
        // Store hash in your password DB.
        //Register
        databaseName
          .collection('login')
          .insertOne({ id: req.body.id, pw: hash }, function (에러, 결과) {
            res.redirect('/');
          });
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
