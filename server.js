const express = require('express');
const app = express();

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, function () {
  console.log('listening on 8080');
});

app.get('/', function (req, res) {
  res.send('Hello');
});

// - [ ] GET posts
app.get('/posts', function (req, res) {
  res.send('GET post list');
});
// - [ ] GET post by :id
app.get('/posts/:id', function (req, res) {
  res.send(`GET posts ${req.params.id}`);
});
// - [ ] POST posts by :id
app.post('/posts', function (req, res) {
  res.send(`POST posts ${req.body.title}`);
});
// - [ ] PUT post by :id
app.put('/posts/:id', function (req, res) {
  res.send('PUT posts');
});

// - [ ] DELETE posts by :id
app.delete('/posts/:id', function (req, res) {
  res.send('DELETE posts');
});
