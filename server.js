require('dotenv').config();

const express = require('express');
const app = express();

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, function () {
  console.log('listening on 8080');
});
const session = require('express-session');

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: false,
  }),
);
//-

//database
var databaseName;

//import routes /api/posts
app.use('/api/', require('./api/posts.js'));
//import routes /api/auth
app.use('/api/', require('./api/auth.js'));

app.get('/', function (req, res) {
  res.send('Hello');
});
