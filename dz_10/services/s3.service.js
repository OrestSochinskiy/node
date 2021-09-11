const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v1;

const {
  AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY, AWS_S3_NAME, AWS_S3_NAME_REGION
} = require('../config/variables');

const bucket = new S3({
  region: AWS_S3_NAME_REGION,
  accessKeyId: AWS_S3_ACCESS_KEY,
  secretAccessKey: AWS_S3_SECRET_KEY,
});

module.exports = {
  uploadFile: (file, itemType, itemId) => {
    const { data, mimetype, name } = file;

    const fileName = _fileNameBuilder(name, itemType, itemId);

    return bucket.upload({
      Bucket: AWS_S3_NAME,
      Body: data,
      Key: fileName,
      ContentTypee: mimetype,
    }).promise();
  }
};

function _fileNameBuilder(fileName, itemtype, itemId) {
  const fileExtension = path.extname(fileName);
  return path.join(itemtype, itemId.toString(), `${uuid()}${fileExtension}`);
}
