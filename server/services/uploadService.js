const { getSignedUploadUrl } = require('../config/s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const getUploadUrl = async (filename, contentType) => {
  const ext = path.extname(filename);
  const key = `uploads/${uuidv4()}${ext}`;
  const url = await getSignedUploadUrl(key, contentType);
  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  return { uploadUrl: url, fileUrl };
};

module.exports = { getUploadUrl };
