require('dotenv').config();

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
// eslint-disable-next-line no-undef
const MongoURI = process.env.MONGO_URI;

//body-parser
app.use(express.json());
app.use(
  cors({
    origin: '*', // 출처 허용 옵션
    credential: 'true', // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  }),
);
app.use(express.urlencoded({ extended: true }));

//database
const MongoStore = require('connect-mongo');

//passport
const passport = require('passport');

//session
const session = require('express-session');

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MongoURI }),
    cookie: { maxAge: 3.6e6 * 24 }, // 24시간 유효
  }),
);

app.listen(8080, function () {
  //server
  console.log('listening on 8080');
});

MongoClient.connect(MongoURI)
  .then((db) => {
    //database
    console.log('db connected');
    var databaseName;
    //
    databaseName = db.db('todoapp');
    app.databaseName = databaseName;

    //passport
    require('./src/config/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());

    //import routes /api/auth
    app.use('/api/auth', require('./src/api/auth.js'));
    //import routes /api/posts
    app.use('/api/', require('./src/api/posts.js'));
    app.use('/api/products', require('./src/api/products.js'));
    app.get('/', function (req, res) {
      res.send('Hello');
    });
  })
  .catch((err) => {
    return err;
  });

// MongoClient.connect(MongoURI, (err, result) => {
//   if (err) {
//     return err;
//   } else if (result) {
//     console.log('db connected');
//     //database
//     //awaiut function
//     app.listen(8080, function () {
//       console.log('listening on 8080');
//     });
//     var databaseName;
//     //
//     databaseName = result.db('todoapp');
//     app.databaseName = databaseName;
//   }
// });

module.exports.handler = serverless(app);
