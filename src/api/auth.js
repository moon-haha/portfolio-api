const auth = require('express').Router();
const passport = require('passport');

const bcrypt = require('bcryptjs');

auth.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function (req, res) {
    res.send({ user: req.user });
  },
);

function isLogged(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}
auth.get('/check', isLogged, function (req, res) {
  //console.log(req.user);
  if (req.user) {
    res.json(req.user);
  } else {
    res.send('비로그인');
  }
});

auth.post('/register', function (req, res) {
  //DB Client 연결
  var pw = req.body.pw;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(pw, salt, function (err, hash) {
      // Store hash in your password DB.
      //Register
      req.app.databaseName
        .collection('login')
        .insertOne({ id: req.body.id, pw: hash, tier: 0 }, function () {
          //console.log(result);
          res.redirect('/');
        });
    });
  });
});

auth.post('/tier', function (req, res) {
  //req user에서 username으로 찾는다.
  req.app.databaseName.collection('login').updateOne(
    { _id: req.user._id },
    //tier는 req,body에 있는 tiervalue
    { $set: { tier: parseInt(req.body.TierValue) } },
    function () {
      //tier를 바꾼다.
      res.redirect('mypage');
    },
  );

  //

  /*
  var pw = req.body.pw;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(pw, salt, function (err, hash) {
      // Store hash in your password DB.
      //Register
      req.app.databaseName
        .collection('login')
        .insertOne({ id: req.body.id, pw: hash, tier: 0 }, function () {
          //console.log(result);
          res.redirect('/');
        });
    });
  });
  */
});

// - myPage
auth.get('/mypage', isLogged, function (req, res) {
  //로그인 했는지 체크
  //console.log(req.user.id);
  res.json({ user: req.user });
});

//logout
auth.post('/logout', function (req, res, next) {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.send('logout');
  });
});

module.exports = auth;
