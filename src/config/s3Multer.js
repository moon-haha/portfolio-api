/*
  1. AWS SDK
  2. Express Multer
  3. Multer S3
  4. path

  1.1 S3 설정
  1.2 upload Multer 설정
*/

const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'high-market-image-resource',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    contentDisposition: 'attachment',
    serverSideEncryption: 'AES256',
  }),
});

module.exports = upload;
