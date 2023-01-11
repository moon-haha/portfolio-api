const posts = require('express').Router();
//database

// /api/posts
// - [ ] GET posts
posts.get('/posts', function (req, res) {
  req.app.databaseName
    .collection('post')
    .find()
    .toArray(function (err, result) {
      res.send(result);
    });
});
// - [ ] GET post by :id
posts.get('/posts/:id', function (req, res) {
  req.app.databaseName
    .collection('post')
    .findOne({ _id: parseInt(req.params.id) }, function (err, result) {
      console.log(result);
      res.send(result);
    });
});

// - [ ] PUT post by :id
posts.put('/posts/:id', function (req, res) {
  req.app.databaseName
    .collection('post')
    .updateOne(
      { _id: parseInt(req.params.id) },
      { $set: { name: req.body.name, age: req.body.age } },
      function () {
        res.send('update 완료');
      },
    );
});

// - [ ] DELETE posts by :id
posts.delete('/posts/:id', function (req, res) {
  req.app.databaseName
    .collection('post')
    .deleteOne({ _id: parseInt(req.params.id) }, function () {
      res.send(req.params.id);
      console.log(`${req.params.id} 삭제완료`);
    });
});

posts.get('/search', function (req, res) {
  console.log(req.query.value);
  req.app.databaseName
    .collection('post')
    .find({ 제목: req.query.value })
    .toArray((err, result) => {
      console.log(result);
      res.send(result);
    });
});

// - [ ] POST posts by :id
posts.post('/posts', function (req, res) {
  req.app.databaseName
    .collection('counter')
    .findOne({ name: '게시물갯수' }, function (에러, 결과) {
      console.log(결과);
      var 총게시물갯수 = 결과.totalPost;

      req.app.databaseName.collection('post').insertOne(
        {
          _id: 총게시물갯수 + 1,
          제목: req.body.title,
          내용: req.body.content,
          작성자: req.user._id,
        },
        function () {
          req.app.databaseName
            .collection('counter')
            .updateOne(
              { name: '게시물갯수' },
              { $inc: { totalPost: 1 } },
              function (에러) {
                if (에러) {
                  return console.log(에러);
                }
                res.send({
                  _id: 총게시물갯수 + 1,
                  제목: req.body.title,
                  내용: req.body.content,
                  작성자: req.user._id,
                });
              },
            );
        },
      );
    });
});

module.exports = posts;
