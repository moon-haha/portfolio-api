const products = require('express').Router();
const { ObjectId } = require('mongodb');
const upload = require('../config/s3Multer');
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

function isLogged(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}

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
  let categoryId = req.params.category;
  if (categoryId == 0) {
    categoryId = 'electronics';
  } else if (categoryId == 1) {
    categoryId = 'jewelery';
  } else if (categoryId == 2) {
    categoryId = `men's clothing`;
  } else if (categoryId == 3) {
    categoryId = `women's clothing`;
  }

  var sortObject = {};
  if (req.params.sort == 'recents') {
    sortObject = { id: '-1' };
  } else if (req.params.sort == 'count') {
    sortObject = { 'rating.count': '-1' };
  } else if (req.params.sort == 'rating') {
    sortObject = { 'rating.rate': '-1' };
  }

  //console.log(sortObject);
  //console.log(categoryId);
  req.app.databaseName
    .collection('products')
    .find({ category: categoryId })
    .sort(sortObject)
    .toArray((err, result) => {
      res.send(result);
    });
});

// - [ ] put post by :id
products.put('/:id', isLogged, upload.single('image'), function (req, res) {
  //PUT ?????? - ???????????? ?????? ??? ???????????? ??????

  //1) id Params??? ???????????? ???????????? ????????????.
  req.app.databaseName
    .collection('products')
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      var OriginData = new Object();
      OriginData = result;
      let imgLink;
      if (req.file !== undefined) {
        imgLink = req.file.location;
      }

      //2) ???????????? ????????? ????????? ??????????????? ????????????.
      //????????? ????????? ?????? ????????????.
      //patchData Data
      let patchData = new Object();
      //?????? ??????????????? ??????
      if (req.body.title) {
        //????????? push
        patchData = { title: req.body.title };
      }
      //?????? ??????????????? ??????
      if (req.body.description) {
        //?????? ????????????
        patchData = { ...patchData, description: req.body.description };
      } //?????? ??????????????? ??????
      if (req.body.price) {
        //?????? ????????????
        patchData = { ...patchData, price: req.body.price };
      } //???????????? ??????????????? ??????
      if (req.body.category) {
        //?????? ????????????
        patchData = { ...patchData, category: req.body.category };
      } //????????? ??????????????? ??????
      if (imgLink) {
        patchData = { ...patchData, image: imgLink };
      }
      //Object Key ???????????? ????????????.
      const putData = Object.assign(OriginData, patchData);
      console.log(putData);

      //3) validId??? ????????? ????????????
      //validId : ????????? id??? ??????, ??????????????? ?????? ?????? ??????(???????????? ?????? ????????????)
      var valId = { id: parseInt(req.params.id), editor: req.user._id };

      //????????? ????????? id??? ????????? editor id ?????? ?????? param id ??????
      if (putData.editor == null) {
        req.app.databaseName
          .collection('products')
          .updateOne(
            { id: parseInt(req.params.id) },
            { $set: putData },
            function (err, result) {
              res.send('put completed(no editor)');
            },
          );
      } else {
        //ID ??????, ????????? user._id ?????? ??? patchData??? ??????
        req.app.databaseName
          .collection('products')
          .updateOne(valId, { $set: putData }, function (err, result) {
            res.send('put complete');
          });
      }
    });
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
  req.app.databaseName
    .collection('products')
    .find({ category: categoryId })
    .toArray(function (err, result) {
      res.send(result);
    });
});

// - [ ] GET post by :id
products.get('/:id', function (req, res) {
  // 1) ????????? ????????? ????????????
  req.app.databaseName
    .collection('products')
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      let productsData = result;
      //2) ?????? ?????? GET : products/:id??? ?????????
      //?????? collection?????? ??????id ?????? ?????? ????????? ????????????
      req.app.databaseName
        .collection('comments')
        .find({ parentsId: productsData._id })
        .toArray(function (err, result) {
          if (err) throw err;
          let comments = result;
          productsData = { productsData, comments };
          res.send(productsData);
        });
    });
});

// - [ ] DELETE posts by :id
products.delete('/:id', function (req, res) {
  //??? ???????????? ?????? ???????????? ?????????
  var valId = { id: parseInt(req.params.id), editor: req.user._id };

  //????????? ????????? id??? ????????? editor id ?????? ?????? param id ??????????????????
  req.app.databaseName
    .collection('products')
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      var OriginData = result;

      if (OriginData.editor == null) {
        req.app.databaseName
          .collection('products')
          // eslint-disable-next-line no-unused-vars
          .deleteOne({ id: parseInt(req.params.id) }, function (err, result) {
            console.log('done');
            res.send('delete completed(no editor)');
          });
      } else {
        //ID ??????, ????????? user._id ?????? ??? Delete
        req.app.databaseName
          .collection('products')
          // eslint-disable-next-line no-unused-vars
          .deleteOne(valId, function (err, result) {
            //?????? id??? ????????????, ????????? valid??? ????????????
            console.log('done');
            res.send('delete complete');
          });
      }
    });
});

products.post('/', isLogged, upload.single('image'), function (req, res) {
  /* !????????? ?????????
   **  - Serverless-offline?????? ????????? ?????????, node server??? ????????? ??????(products?????? port ???????????? ?????????)
   ** ?????? ?????? : req.file;
   ** ?????? ?????? : req.file.location;
   */

  //???????????????.totalPost ??????.
  req.app.databaseName
    .collection('counter')
    .findOne({ name: '???????????????' }, function (??????, ??????) {
      var ?????????????????? = ??????.totalPost;
      /*data example
       **{
       ** "_id":"ObjectId",
       ** "id":Number(totalPost),
       ** "title":String,
       ** "price":Number,
       ** "description":String
       ** "category": String
       ** "image":String(imageLink),
       ** "rating":{"rate":0,"count":0}
       ** "editor":"req.user._id"
       */

      let imgLink;
      if (req.file !== undefined) {
        imgLink = req.file.location;
      }
      //?????? ???????????? ????????????
      const data = {
        id: ?????????????????? + 1,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imgLink,
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
              { name: '???????????????' },
              { $inc: { totalPost: 1 } },
              function (??????) {
                if (??????) {
                  return; //console.log(??????);
                }
                res.send({ id: data.id });
                //console.log(data);
              },
            );
        });
    });
});

// comments- ??????
//1) ?????? ?????? POST products/:id/comment??? ?????????
products.post('/:id/comments', isLogged, function (req, res) {
  //1) products?????? id????????? ??????
  req.app.databaseName
    .collection('products')
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      //??????(?????????)Id, ?????????Id, ????????????
      let parentsId = result._id;
      let editorId = req.user._id;
      let commentBody = req.body.commentBody;
      //?????? collection??? ?????? ??????, ?????????, ?????? id??? ????????????.
      let Data = {
        parentsId: parentsId,
        editorId: editorId,
        commentBody: commentBody,
      };

      //Comments ??? ???????????????
      req.app.databaseName.collection('comments').insertOne(Data, function () {
        console.log('complete');
        res.send('comments complete');
      });
    });
});

//3) ?????? ?????? : DELETE : products/:id/comment/:id
products.delete('/comments/:commentId', isLogged, function (req, res) {
  //?????? ????????? ??? ?????? ??? params??? ?????? ?????? ??????
  //var valId = { _id: req.params.commentId, editorId: req.user._id };
  //????????? ?????? ????????? ?????? ????????????.

  req.app.databaseName
    .collection('comments')
    .deleteOne(
      { _id: ObjectId(req.params.commentId), editorId: req.user._id },
      function (err, result) {
        if (err) err;
        console.log(result);
        res.send('delete complete');
      },
    );
});

module.exports = products;
