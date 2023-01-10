require('dotenv').config();

const express = require('express');
const app = express();

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database
const MongoClient = require('mongodb').MongoClient;
var databaseName;
// eslint-disable-next-line no-undef
const MongoURI = process.env.MONGO_URI;
MongoClient.connect(MongoURI, function (err, result) {
  if (err) return console.log(err);

  databaseName = result.db('todoapp');

  databaseName
    .collection('post')
    .insertOne({ 이름: 'Jhon', 나이: 20 }, function (err, result) {
      console.log('완료');
    });

  app.listen(8080, function () {
    console.log('listening on 8080 and connected db');
  });
});

//import routes /api/posts
app.use('/api/', require('./api/posts.js'));

app.get('/', function (req, res) {
  res.send('Hello');
});
