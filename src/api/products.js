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
  //PUT 요청 - 데이터를 모두 다 교체하는 개념

  //1) id Params를 바탕으로 데이터를 가져온다.
  req.app.databaseName
    .collection('products')
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      var OriginData = new Object();
      OriginData = result;
      let imgLink;
      if (req.file !== undefined) {
        imgLink = req.file.location;
      }

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
      if (imgLink) {
        patchData = { ...patchData, image: imgLink };
      }
      //Object Key 확인해서 수정한다.
      const putData = Object.assign(OriginData, patchData);
      console.log(putData);

      //3) validId로 조건을 확인한다
      //validId : 게시글 id로 검색, 글작성자와 현재 유저 비교(작성자만 수정 가능하게)
      var valId = { id: parseInt(req.params.id), editor: req.user._id };

      //게시글 작성자 id가 없으면 editor id 비교 없이 param id 검색
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
        //ID 검색, 작성자 user._id 비교 후 patchData로 변경
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
  // 1) 디테일 데이터 가져오기
  req.app.databaseName
    .collection('products')
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      let productsData = result;
      //2) 댓글 확인 GET : products/:id로 요청시
      //댓글 collection에서 부모id 기반 댓글 데이터 가져오기
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
            console.log('done');
            res.send('delete completed(no editor)');
          });
      } else {
        //ID 검색, 작성자 user._id 비교 후 Delete
        req.app.databaseName
          .collection('products')
          // eslint-disable-next-line no-unused-vars
          .deleteOne(valId, function (err, result) {
            //임시 id만 체크해서, 나중에 valid로 바꿔야함
            console.log('done');
            res.send('delete complete');
          });
      }
    });
});

products.post('/', isLogged, upload.single('image'), function (req, res) {
  /* !이미지 업로드
   **  - Serverless-offline에서 테스트 불가능, node server로 테스트 필요(products에서 port 뚫어주고 테스트)
   ** 파일 정보 : req.file;
   ** 파일 링크 : req.file.location;
   */

  //개시물갯수.totalPost 찾기.
  req.app.databaseName
    .collection('counter')
    .findOne({ name: '게시물갯수' }, function (에러, 결과) {
      var 총게시물갯수 = 결과.totalPost;
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
      //객체 만들어서 저장하기
      const data = {
        id: 총게시물갯수 + 1,
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

// comments- 댓글
//1) 댓글 작성 POST products/:id/comment로 요청시
products.post('/:id/comments', isLogged, function (req, res) {
  //1) products에서 id데이터 찾기
  req.app.databaseName
    .collection('products')
    .findOne({ id: parseInt(req.params.id) }, function (err, result) {
      //부모(게시글)Id, 작성자Id, 댓글내용
      let parentsId = result._id;
      let editorId = req.user._id;
      let commentBody = req.body.commentBody;
      //댓글 collection에 댓글 내용, 작성자, 부모 id를 기록한다.
      let Data = {
        parentsId: parentsId,
        editorId: editorId,
        commentBody: commentBody,
      };

      //Comments 에 저장시키기
      req.app.databaseName.collection('comments').insertOne(Data, function () {
        console.log('complete');
        res.send('comments complete');
      });
    });
});

//3) 댓글 삭제 : DELETE : products/:id/comment/:id
products.delete('/comments/:commentId', isLogged, function (req, res) {
  //현재 유저가 쓴 댓글 중 params와 맞는 조건 찾기
  //var valId = { _id: req.params.commentId, editorId: req.user._id };
  //조건에 맞는 문서를 찾아 삭제한다.

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
