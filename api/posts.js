const posts = require('express').Router();
//database
const MongoClient = require('mongodb').MongoClient;
var databaseName;
// eslint-disable-next-line no-undef
const MongoURI = process.env.MONGO_URI;
// /api/posts

// - [ ] GET posts
posts.get('/posts', function (req, res) {
  MongoClient.connect(MongoURI, function (err, result) {
    if (err) return console.log(err);
    console.log('mongo connected');

    databaseName = result.db('todoapp');
    databaseName
      .collection('post')
      .find()
      .toArray(function (err, result) {
        res.send(result);
      });
  });
});
// - [ ] GET post by :id
posts.get('/posts/:id', function (req, res) {
  MongoClient.connect(MongoURI, function (err, result) {
    if (err) return console.log(err);
    //console.log('mongo connected');
    databaseName = result.db('todoapp');
    databaseName
      .collection('post')
      .findOne({ _id: parseInt(req.params.id) }, function (err, result) {
        console.log(result);
        res.send(result);
      });
  });
});
// - [ ] POST posts by :id
posts.post('/posts', function (req, res) {
  MongoClient.connect(MongoURI, function (err, result) {
    if (err) return console.log(err);
    console.log('mongo connected');
    databaseName = result.db('todoapp');

    databaseName
      .collection('counter')
      .findOne({ name: '게시물갯수' }, function (에러, 결과) {
        console.log(결과);
        var 총게시물갯수 = 결과.totalPost;

        databaseName.collection('post').insertOne(
          {
            _id: 총게시물갯수 + 1,
            name: req.body.name,
            age: req.body.age,
          },
          function (에러, 결과) {
            databaseName
              .collection('counter')
              .updateOne(
                { name: '게시물갯수' },
                { $inc: { totalPost: 1 } },
                function (에러, 결과) {
                  if (에러) {
                    return console.log(에러);
                  }
                  res.send(req.body);
                },
              );
          },
        );
      });
  });
});
// - [ ] PUT post by :id
posts.put('/posts/:id', function (req, res) {
  MongoClient.connect(MongoURI, function (err, result) {
    if (err) return console.log(err);
    //console.log('mongo connected');
    databaseName = result.db('todoapp');

    databaseName
      .collection('post')
      .updateOne(
        { _id: parseInt(req.params.id) },
        { $set: { name: req.body.name, age: req.body.age } },
        function (err, result) {
          res.send('update 완료');
        },
      );
  });
});

// - [ ] DELETE posts by :id
posts.delete('/posts/:id', function (req, res) {
  MongoClient.connect(MongoURI, function (err, result) {
    if (err) return console.log(err);
    //console.log('mongo connected');
    databaseName = result.db('todoapp');

    databaseName
      .collection('post')
      .deleteOne({ _id: parseInt(req.params.id) }, function (err, result) {
        res.send(req.params.id);
        console.log(`${req.params.id} 삭제완료`);
      });
  });
});

module.exports = posts;
