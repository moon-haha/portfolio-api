const products = require('express').Router();

/*data example
 **{
 ** "_id":"63bf7f559de695b7e06b6e13",
 ** "id":4,
 ** "title":"Mens Casual Slim Fit",
 ** "price":15.99,
 ** "description":"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
 ** "category":"men's clothing",
 ** "image":"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
 ** "rating":{"rate":2.1,"count":430}
 **
 */
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
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      console.log(result);
      res.send(result);
    });
});

// - [ ] patch post by :id
products.patch('/products/:id', function (req, res) {
  /*data example
   **{
   ** "_id":"63bf7f559de695b7e06b6e13",
   ** "id":4,
   ** "title":"Mens Casual Slim Fit",
   ** "price":15.99,
   ** "description":"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
   ** "category":"men's clothing",
   ** "image":"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
   ** "rating":{"rate":2.1,"count":430}
   **
   */
  const data = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    //imageLink : s3 image link
    rating: { rate: 0.0, count: 0 },
    //작성자 : 추가해야함
  };
  req.app.databaseName.collection('products').updateOne(
    { id: parseInt(req.params.id) },
    {
      $set: data,
    },
    function () {
      res.send('pached 완료');
    },
  );
});

// - [ ] DELETE posts by :id
products.delete('/products/:id', function (req, res) {
  //글 작성자와 지금 로그인한 사용자
  //var valId = { id: parseInt(req.params.id), 작성자: req.user._id };
  //console.log(valId);
  //console.log(valId);
  req.app.databaseName.collection('products').deleteOne(
    { id: parseInt(req.params.id) },
    //valId,
    function (err, result) {
      res.send(result);
      console.log(result);
      //console.log(`${req.params.id} 삭제완료`);
    },
  );
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

products.post('/products', function (req, res) {
  req.app.databaseName
    .collection('counter')
    .findOne({ name: '게시물갯수' }, function (에러, 결과) {
      console.log(결과);
      var 총게시물갯수 = 결과.totalPost;

      /*data example
       **{
       ** "_id":"63bf7f559de695b7e06b6e13",
       ** "id":4,
       ** "title":"Mens Casual Slim Fit",
       ** "price":15.99,
       ** "description":"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
       ** "category":"men's clothing",
       ** "image":"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
       ** "rating":{"rate":2.1,"count":430}
       **
       */
      const data = {
        id: 총게시물갯수 + 1,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        //imageLink : s3 image link
        rating: { rate: 0.0, count: 0 },
        //작성자 : 추가해야함
      };

      req.app.databaseName
        .collection('products')
        .insertOne(data, function (result) {
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
                  내용: req.body.description,
                  가격: req.body.price,
                  카테고리: req.body.category,
                  //작성자: req.user._id,
                  //image 등등
                });
              },
            );
        });
    });
});

module.exports = products;
