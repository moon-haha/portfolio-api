const products = require('express').Router();
//database

// /api/products
// - [ ] GET products
products.get('/products', function (req, res) {
  req.app.databaseName
    .collection('products')
    .find()
    .toArray(function (err, result) {
      res.send(result);
    });
});
// - [ ] GET post by :id
products.get('/products/:id', function (req, res) {
  req.app.databaseName
    .collection('products')
    .findOne({ _id: parseInt(req.params.id) }, function (err, result) {
      console.log(result);
      res.send(result);
    });
});

// - [ ] PUT post by :id
products.put('/products/:id', function (req, res) {
  req.app.databaseName
    .collection('products')
    .updateOne(
      { _id: parseInt(req.params.id) },
      { $set: { name: req.body.name, age: req.body.age } },
      function () {
        res.send('update 완료');
      },
    );
});

// - [ ] DELETE posts by :id
products.delete('/products/:id', function (req, res) {
  //글 작성자와 지금 로그인한 사용자
  var valId = { _id: parseInt(req.params.id), 작성자: req.user._id };
  //console.log(valId);
  console.log(valId);
  req.app.databaseName
    .collection('products')
    .deleteOne(valId, function (err, result) {
      res.send(result);
      console.log(result);
      //console.log(`${req.params.id} 삭제완료`);
    });
});

products.get('/products/search', function (req, res) {
  console.log(req.query.value);
  req.app.databaseName
    .collection('products')
    .find({ 제목: req.query.value })
    .toArray((err, result) => {
      console.log(result);
      res.send(result);
    });
});

// - [ ] POST products by :id
products.post('/products', function (req, res) {
  req.app.databaseName
    .collection('counter')
    .findOne({ name: '게시물갯수' }, function (에러, 결과) {
      console.log(결과);
      var 총게시물갯수 = 결과.totalPost;

      req.app.databaseName.collection('products').insertOne(
        {
          _id: 총게시물갯수 + 1,
          제목: req.body.title,
          내용: req.body.content,
          작성자: req.user._id,
        },
        function () {
          req.app.databaseName
            .collection('counter')
            .updateOne(
              { name: '게시물갯수' },
              { $inc: { totalPost: 1 } },
              function (에러) {
                if (에러) {
                  return console.log(에러);
                }
                res.send({
                  _id: 총게시물갯수 + 1,
                  제목: req.body.title,
                  내용: req.body.content,
                  작성자: req.user._id,
                });
              },
            );
        },
      );
    });
});

module.exports = products;
