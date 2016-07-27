const db = require('../db/db.js');
const AWS = require('aws-sdk');
const shortid = require('shortid');
const dotenv = require('dotenv');

// AWS Config
dotenv();
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
// Default region
AWS.config.update({ region: 'us-east-1' });

// Create a pre-signed url which will be used by the client to post video to S3
function generatePreSignedUrl(req, res) {
  // Generate unique filename for video
  const awsFilename = `${Date.now()}-${shortid.generate()}`;

  // Get pre-signed URL from S3 then send back to client and client will do the PUT request to S3
  // Pre-signed URL will be valid for 600 seconds
  const s3 = new AWS.S3();
  const params = {
    // Setup with your bucket name
    Bucket: process.env.AWS_BUCKET,
    Key: awsFilename,
    ContentType: 'video/webm',
    ACL: 'public-read',
    Expires: 600, // The time which the URL is available for putting file
  };

  // S3 method to generate pre-signed-url from the params
  const preSignedUrl = s3.getSignedUrl('putObject', params);

  // Format of publicUrl that will be used to access the video
  const publicUrl = `https://s3.amazonaws.com/${params.Bucket}/${params.Key}`;

  res.send({ preSignedUrl, publicUrl });
}

// Get video by code and send video to client
function getVideo(req, res) {
  const code = req.query.code;
  console.log('Getting video with code:', code);

  db.Video.findOne({
    where: { code },
  }).then((video) => {
    res.send(video);
  });
}

// Create video with aws public url and uniq code
// Send code to client on success
function createVideo(req, res) {
  const url = req.body.publicUrl;
  const code = shortid.generate();
  console.log('Creating video with url:', url);

  db.Video.create({
    url,
    code,
  })
  .then((video) => {
    console.log('Created video:', video);
    res.send({
      success: 'video created',
      code: video.code,
    });
  });
}

module.exports = {
  generatePreSignedUrl,
  getVideo,
  createVideo,
};
