require('dotenv').config();

const express = require('express');
const app = express();

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const MongoStore = require('connect-mongo');

app.listen(8080, function () {
  console.log('listening on 8080');
});
const session = require('express-session');

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 3.6e6 * 24 }, // 24시간 유효
  }),
);
//-

//database
var databaseName;

//import routes /api/auth
app.use('/api/auth', require('./api/auth.js'));
//import routes /api/posts
app.use('/api/', require('./api/posts.js'));

app.get('/', function (req, res) {
  res.send('Hello');
});
