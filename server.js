require('dotenv').config();

const serverless = require('serverless-http');
const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
// eslint-disable-next-line no-undef
const MongoURI = process.env.MONGO_URI;

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database
const MongoStore = require('connect-mongo');

//passport
const passport = require('passport');

//session
const session = require('express-session');

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MongoURI }),
    cookie: { maxAge: 3.6e6 * 24 }, // 24시간 유효
  }),
);

//database
var databaseName;
MongoClient.connect(MongoURI, function (err, result) {
  if (err) return console.log(err);
  console.log('mongo connected');
  databaseName = result.db('todoapp');
  app.databaseName = databaseName;
});

//passport
require('./src/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.listen(8080, function () {
  console.log('listening on 8080');
});
//-

//import routes /api/auth
app.use('/api/auth', require('./src/api/auth.js'));
//import routes /api/posts
app.use('/api/', require('./src/api/posts.js'));
app.use('/api/', require('./src/api/products.js'));
app.get('/', function (req, res) {
  res.send('Hello');
});

module.exports.handler = serverless(app);
