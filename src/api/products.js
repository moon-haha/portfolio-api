const products = require('express').Router();

// const sampleData = {
//   // id: count
//   title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
//   price: 109.95,
//   description:
//     'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
//   category: "men's clothing",
//   image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
//   rating: { rate: 3.9, count: 120 },
//   //writer : req.user._id
// };

// /api/products
// - [ ] GET products
products.get('/', function (req, res) {
  req.app.databaseName
    .collection('products')
    .find()
    .toArray(function (err, result) {
      res.send(result);
    });
});

// /api/products/:sort

products.get('/sort/:sort', function (req, res) {
  /*
   ** sort
     1) recents id: -1
     2) count rating.count -1
     3) rate rating.rate
   ** category
     1) electronics = {category : category}
     2) jewelery = {category : category}
     3) men's clothing { category : category}
     4) women's clothing { category : category }
   */
  console.log(req.params.sort);

  var sortObject = {};
  if (req.params.sort == 'recents') {
    sortObject = { id: '-1' };
  } else if (req.params.sort == 'count') {
    sortObject = { 'rating.count': '-1' };
  } else if (req.params.sort == 'rating') {
    sortObject = { 'rating.rate': '-1' };
  }

  req.app.databaseName
    .collection('products')
    .find()
    .sort(sortObject)
    .toArray((err, result) => {
      res.send(result);
    });
});

// - [ ] GET sort products(recent, count, rate)
products.get('/sort/:sort/category/:category', function (req, res) {
  /*
   ** sort
     1) recents id: -1
     2) count rating.count -1
     3) rate rating.rate
   ** category
     1) electronics = {category : category}
     2) jewelery = {category : category}
     3) men's clothing { category : category}
     4) women's clothing { category : category }
   */

  var sortObject = {};
  if (req.params.sort == 'recents') {
    sortObject = { id: '-1' };
  } else if (req.params.sort == 'count') {
    sortObject = { 'rating.count': '-1' };
  } else if (req.params.sort == 'rating') {
    sortObject = { 'rating.rate': '-1' };
  }

  console.log(sortObject);
  console.log(req.params.category);
  req.app.databaseName
    .collection('products')
    .find({ category: req.params.category })
    .sort(sortObject)
    .toArray((err, result) => {
      res.send(result);
    });
});

// - [ ] patch post by :id
products.patch('/:id', function (req, res) {
  var valId = { id: parseInt(req.params.id), editor: req.user._id };

  const data = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 0.0, count: 0 },
    editor: req.user._id,
  };

  req.app.databaseName.collection('products').updateOne(
    valId,
    {
      $set: data,
    },
    function () {
      res.send('pached 완료');
    },
  );
});

// QueryString
products.get('/search', function (req, res) {
  //products/search?value=value
  // req.app.databaseName
  //   .collection('products')
  //   .find({ title: req.query.value })
  //   .toArray(function (err, result) {
  //     res.send(result);
  //   });
  //products/search?value=value
  var searchCondition = [
    {
      $search: {
        index: 'productSearchIndex',
        text: {
          query: req.query.value,
          path: ['title', 'description', 'category'],
        },
      },
    },
  ];
  req.app.databaseName
    .collection('products')
    .aggregate(searchCondition)
    .toArray(function (err, result) {
      res.send(result);
    });
});
products.get('/category/:id', function (req, res) {
  // categories params
  /* [
    0: "electronics",
    1: "jewelery",
    2: "men's clothing",
    3: "women's clothing"]
  */
  let categoryId = req.params.id;
  if (categoryId == 0) {
    categoryId = 'electronics';
  } else if (categoryId == 1) {
    categoryId = 'jewelery';
  } else if (categoryId == 2) {
    categoryId = `men's clothing`;
  } else if (categoryId == 3) {
    categoryId = `women's clothing`;
  }
  console.log(categoryId);
  req.app.databaseName
    .collection('products')
    .find({ category: categoryId })
    .toArray(function (err, result) {
      res.send(result);
    });
});

// - [ ] GET post by :id
products.get('/:id', function (req, res) {
  req.app.databaseName
    .collection('products')
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      console.log(result);
      res.send(result);
    });
});

// - [ ] DELETE posts by :id
products.delete('/:id', function (req, res) {
  //글 작성자와 지금 로그인한 사용자
  var valId = { id: parseInt(req.params.id), editor: req.user._id };
  console.log(valId);

  req.app.databaseName
    .collection('products')
    .deleteOne(valId, function (err, result) {
      res.send(result);
      console.log(`${req.params.id} 삭제완료`);
    });
});
products.post('/', function (req, res) {
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
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        //imageLink : s3 image link
        rating: { rate: 0.0, count: 0 },
        editor: req.user._id,
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
                res.send(result);
                console.log(data);
              },
            );
        });
    });
});

module.exports = products;
