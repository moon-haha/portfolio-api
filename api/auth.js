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

// hashing salt
const bcrypt = require('bcrypt');
const saltRounds = 23;

auth.use(passport.initialize());
auth.use(passport.session());

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

var myPlaintextPassword = 12345;
bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
    // Store hash in your password DB.
  });
});

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
      //비밀번호를 암호화 시킨다.
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

            if (bcrypt.compare(입력한비번, 결과.pw)) {
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
