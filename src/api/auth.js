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
          passport.authenticate('local')(req, res, function () {
            if (req.user) {
              res.send('register + cookie success');
            } else {
              console.log(err);
            }
          });
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
});

// - myPage
auth.get('/mypage', isLogged, function (req, res) {
  //로그인 했는지 체크

  // req.user Tier 확인
  // Null ->  리다이렉트
  if (req.user.tier == 0) {
    //유저 정보 객체로 담기
    let user = req.user;

    //댓글 작성 가능
    //내가 작성한 글 리스트 검색
    req.app.databaseName
      .collection('comments')
      //
      .find({ editorId: user._id })
      .toArray(function (err, result) {
        if (err) throw err;
        let myComments = result;
        user = { user, myComments };
        res.send(user);
      });
  } else if (req.user.tier == 1) {
    // 게시글, 댓글 작성 가능, 내가 쓴 게시글, 댓글 리스트(수정 삭제 가능)

    //유저 정보 객체로 담기
    let user = req.user;

    //댓글 작성 가능
    req.app.databaseName
      .collection('comments')
      //
      .find({ editorId: user._id })
      .toArray(function (err, result) {
        if (err) throw err;
        let myComments = result;
        //내가 작성한 글 리스트 검색
        req.app.databaseName
          .collection('products')
          //
          .find({ editor: user._id })
          .toArray(function (err, result) {
            if (err) throw err;
            let myProducts = result;
            user = { user, myComments, myProducts };
            res.send(user);
          });
      });
  } else if (req.user.tier == 2) {
    // 2, <- 게시글, 댓글 작성, 삭제 기능, 모든 글 리스트
    // 게시글, 댓글 작성 가능, 내가 쓴 게시글, 댓글 리스트(수정 삭제 가능)

    //유저 정보 객체로 담기
    let user = req.user;

    //댓글 작성 가능
    req.app.databaseName
      .collection('comments')
      //
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        let myComments = result;
        //내가 작성한 글 리스트 검색
        req.app.databaseName
          .collection('products')
          //
          .find()
          .toArray(function (err, result) {
            if (err) throw err;
            let myProducts = result;
            user = { user, myComments, myProducts };
            res.send(user);
          });
      });
  } else {
    res.send('no user');
  }
});

//logout
auth.post('/logout', function (req, res) {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.send('logout');
  });
});

module.exports = auth;
