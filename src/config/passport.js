//-passport
//const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoClient = require('mongodb').MongoClient;
// hashing salt
const bcrypt = require('bcryptjs');

var databaseName;

const MongoURI = process.env.MONGO_URI;

module.exports = (passport) => {
  //passport

  //-인증요청
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'pw',
        session: true,
        passReqToCallback: false,
      },
      function (입력한아이디, 입력한비번, done) {
        MongoClient.connect(MongoURI, function (err, result) {
          if (err) return console.log(err);
          //console.log('mongo connected');
          databaseName = result.db('todoapp');
          databaseName
            .collection('login')
            .findOne({ id: 입력한아이디 }, function (에러, 결과) {
              if (에러) return done(에러);
              if (!결과) return done(null, false, { message: 'Error Id' });
              //암호화된 비밀번호 비교
              if (bcrypt.compare(입력한비번, 결과.pw)) {
                return done(null, 결과);
              } else {
                return done(null, false, { message: 'Error' });
              }
            });
        });
      },
    ),
  );
  //-로그인 성공시 세션에 저장
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  //-세션에서 사용자 정보 가져오기
  passport.deserializeUser(function (아이디, done) {
    //유저 정보 가져오기
    MongoClient.connect(MongoURI, function (err, result) {
      if (err) return console.log(err);
      //console.log('mongo connected');

      databaseName = result.db('todoapp');
      databaseName
        .collection('login')
        .findOne({ id: 아이디.id }, function (err, result) {
          done(null, result);
        });
    });
  });
};
