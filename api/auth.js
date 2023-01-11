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

// - [ ] get
auth.get('/auth', function (req, res) {
  res.send('login page');
});
auth.post(
  '/auth',
  passport.authenticate('local', { failureRedirect: '/api/auth' }),
  function (req, res) {
    res.redirect('/');
  },
);

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
  done(null, {});
});

module.exports = auth;
