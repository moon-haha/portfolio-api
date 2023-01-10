const posts = require('express').Router();
// /api/posts

// - [ ] GET posts
posts.get('/posts', function (req, res) {
  res.send('GET post list');
});
// - [ ] GET post by :id
posts.get('/posts/:id', function (req, res) {
  res.send(`GET posts ${req.params.id}`);
});
// - [ ] POST posts by :id
posts.post('/posts', function (req, res) {
  res.send(`POST posts ${req.body.title}`);
});
// - [ ] PUT post by :id
posts.put('/posts/:id', function (req, res) {
  res.send('PUT posts');
});

// - [ ] DELETE posts by :id
posts.delete('/posts/:id', function (req, res) {
  res.send('DELETE posts');
});

module.exports = posts;
