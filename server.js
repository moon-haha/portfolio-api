const express = require('express');
const app = express();

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import routes /api/posts
app.use('/api/', require('./api/posts.js'));

app.listen(8080, function () {
  console.log('listening on 8080');
});

app.get('/', function (req, res) {
  res.send('Hello');
});
