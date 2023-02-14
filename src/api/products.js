const products = require('express').Router();
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
products.put('/:id', function (req, res) {
  //PUT 요청 - 데이터를 모두 다 교체하는 개념

  //1) id Params를 바탕으로 데이터를 가져온다.
  req.app.databaseName
    .collection('products')
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      var OriginData = new Object();
      OriginData = result;

      //2) 데이터가 갱신된 부분만 오브젝트를 교체한다.
      //입력한 데이터 값을 추가한다.
      //patchData Data
      let patchData = new Object();
      //제목 비어있는지 확인
      if (req.body.title) {
        //있으면 push
        patchData = { title: req.body.title };
      }
      //설명 비어있는지 확인
      if (req.body.description) {
        //객체 추가하기
        patchData = { ...patchData, description: req.body.description };
      } //가격 비어있는지 확인
      if (req.body.price) {
        //객체 추가하기
        patchData = { ...patchData, price: req.body.price };
      } //카테고리 비어있는지 확인
      if (req.body.category) {
        //객체 추가하기
        patchData = { ...patchData, category: req.body.category };
      } //이미지 비어있는지 확인
      if (req.body.image) {
        patchData = { ...patchData, image: req.body.image };
      }
      console.log(patchData);
      //Object Key 확인해서 수정한다.
      const putData = Object.assign(OriginData, patchData);

      //3) validId로 조건을 확인한다
      //validId : 게시글 id로 검색, 글작성자와 현재 유저 비교(작성자만 수정 가능하게)
      var valId = { id: parseInt(req.params.id), editor: req.user._id };

      //게시글 작성자 id가 없으면 editor id 비교 없이 param id 검색해서삭제
      if (!putData.editor) {
        req.app.databaseName.collection('products').updateOne(
          { id: parseInt(req.params.id) },
          { $set: putData },
          // eslint-disable-next-line no-unused-vars
          function (err, result) {
            res.send('put completed(no editor)');
          },
        );
      } else {
        //ID 검색, 작성자 user._id 비교 후 patchData로 변경
        req.app.databaseName
          .collection('products')
          //임시 id만 체크해서, 나중에 valid로 바꿔야함
          // eslint-disable-next-line no-unused-vars
          .updateOne({ valId }, { $set: putData }, function (err, result) {
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
  req.app.databaseName
    .collection('products')
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      res.send(result);
    });
});

// - [ ] DELETE posts by :id
products.delete('/:id', function (req, res) {
  //글 작성자와 지금 로그인한 사용자
  var valId = { id: parseInt(req.params.id), editor: req.user._id };

  //게시글 작성자 id가 없으면 editor id 비교 없이 param id 검색해서삭제
  req.app.databaseName
    .collection('products')
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      var OriginData = result;

      if (OriginData.editor == null) {
        req.app.databaseName
          .collection('products')
          // eslint-disable-next-line no-unused-vars
          .deleteOne({ id: parseInt(req.params.id) }, function (err, result) {
            res.send('delete completed(no editor)');
          });
      } else {
        //ID 검색, 작성자 user._id 비교 후 patchData로 변경
        req.app.databaseName
          .collection('products')
          // eslint-disable-next-line no-unused-vars
          .deleteOne({ valId }, function (err, result) {
            //임시 id만 체크해서, 나중에 valid로 바꿔야함

            res.send('delete complete');
          });
      }
    });
});

products.post('/image', upload.single('image'), (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  res.send(req.file.location);
});

products.post('/', function (req, res) {
  /* 글쓰기에 이미지 업로드 추가(multer)
   ** config s3Multer에서 설정.
   **
   */

  req.app.databaseName
    .collection('counter')
    .findOne({ name: '게시물갯수' }, function (에러, 결과) {
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
                  return; //console.log(에러);
                }
                res.send(result);
                //console.log(data);
              },
            );
        });
    });
});

module.exports = products;
