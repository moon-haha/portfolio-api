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
    // databaseName
    //   .collection('post')
    //   .insertOne({ 이름: 'Jhon', 나이: 20 }, function (err, result) {
    //     console.log('완료');
    //   });
  });

  res.send('GET post list');
});
// - [ ] GET post by :id
posts.get('/posts/:id', function (req, res) {
  MongoClient.connect(MongoURI, function (err, result) {
    if (err) return console.log(err);
    console.log('mongo connected');

    databaseName = result.db('todoapp');
    // databaseName
    //   .collection('post')
    //   .insertOne({ 이름: 'Jhon', 나이: 20 }, function (err, result) {
    //     console.log('완료');
    //   });
  });

  res.send(`GET posts ${req.params.id}`);
});
// - [ ] POST posts by :id
posts.post('/posts', function (req, res) {
  //name, age
  MongoClient.connect(MongoURI, function (err, result) {
    if (err) return console.log(err);
    console.log('mongo connected');

    databaseName = result.db('todoapp');
    databaseName
      .collection('post')
      .insertOne(
        { 이름: req.body.name, 나이: req.body.age },
        function (err, result) {
          console.log('완료');
          res.send(`POST posts ${req.body.name}`);
        },
      );
  });
});
// - [ ] PUT post by :id
posts.put('/posts/:id', function (req, res) {
  MongoClient.connect(MongoURI, function (err, result) {
    if (err) return console.log(err);
    console.log('mongo connected');

    databaseName = result.db('todoapp');
    // databaseName
    //   .collection('post')
    //   .insertOne({ 이름: 'Jhon', 나이: 20 }, function (err, result) {
    //     console.log('완료');
    //   });
  });

  res.send('PUT posts');
});

// - [ ] DELETE posts by :id
posts.delete('/posts/:id', function (req, res) {
  MongoClient.connect(MongoURI, function (err, result) {
    if (err) return console.log(err);
    console.log('mongo connected');

    databaseName = result.db('todoapp');
    // databaseName
    //   .collection('post')
    //   .insertOne({ 이름: 'Jhon', 나이: 20 }, function (err, result) {
    //     console.log('완료');
    //   });
  });

  res.send('DELETE posts');
});

module.exports = posts;
