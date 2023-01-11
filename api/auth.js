const auth = require('express').Router();
//database
const MongoClient = require('mongodb').MongoClient;
var databaseName;
// eslint-disable-next-line no-undef
const MongoURI = process.env.MONGO_URI;
// /api/auth

//-passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

auth.use(passport.initialize());
auth.use(passport.session());

//auth login page
auth.get('/auth', function (req, res) {
  res.send('login page');
});

auth.post(
  '/auth',
  passport.authenticate('local', { failureRedirect: '/api/auth' }),
  function (req, res) {
    res.redirect('/api/mypage');
  },
);

function isLogged(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}

// - myPage
auth.get('/mypage', isLogged, function (req, res) {
  //로그인 했는지 체크
  //console.log(req.user.id);
  res.send(`hi ${req.user._id}`);
});

auth.get('/auth', function (req, res) {
  res.send('login page');
});

//passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'pw',
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      //console.log(입력한아이디, 입력한비번);
      MongoClient.connect(MongoURI, function (err, result) {
        if (err) return console.log(err);
        //console.log('mongo connected');
        databaseName = result.db('todoapp');
        databaseName
          .collection('login')
          .findOne({ id: 입력한아이디 }, function (에러, 결과) {
            if (에러) return done(에러);

            if (!결과)
              return done(null, false, { message: '존재하지않는 아이디요' });
            if (입력한비번 == 결과.pw) {
              return done(null, 결과);
            } else {
              return done(null, false, { message: '비번틀렸어요' });
            }
          });
      });
    },
  ),
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (아이디, done) {
  //유저 정보 가져오기
  MongoClient.connect(MongoURI, function (err, result) {
    if (err) return console.log(err);
    //console.log('mongo connected');
    databaseName = result.db('todoapp');
    databaseName
      .collection('login')
      .findOne({ id: 아이디 }, function (err, result) {
        done(null, result);
      });
  });
});

module.exports = auth;
