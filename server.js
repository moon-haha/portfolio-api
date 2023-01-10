require('dotenv').config();

const express = require('express');
const app = express();

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, function () {
  console.log('listening on 8080');
});

//import routes /api/posts
app.use('/api/', require('./api/posts.js'));

app.get('/', function (req, res) {
  res.send('Hello');
});
