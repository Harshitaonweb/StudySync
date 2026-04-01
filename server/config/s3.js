const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const getSignedUploadUrl = async (key, contentType) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
    Expires: 300, // 5 minutes
  };
  return s3.getSignedUrlPromise('putObject', params);
};

module.exports = { s3, getSignedUploadUrl };
