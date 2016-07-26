var db = require('../db/db.js');
var AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY});
//Default region
AWS.config.update({region: 'us-east-1'});
var shortid = require('shortid');

//Create a pre-signed url which will be used by the client to post video to S3
var generatePreSignedUrl = function(req, res) {
  //Generate unique filename for video
  var awsFilename = Date.now() + '-' + shortid.generate();
  // Get pre-signed URL from S3 then send back to client and client will do the PUT request to S3
  // pre-signed URL will be valid for 600 seconds
  var s3 = new AWS.S3();
  var params = {
    //Setup with your bucket name
    Bucket: process.env.AWS_BUCKET, 
    Key: awsFilename, 
    ContentType: 'video/webm',
    ACL: 'public-read', 
    Expires: 600 // this is the time which the URL is available for putting file
  }; 
  
  //S3 method to generate pre-signed-url from the params
  var preSignedUrl = s3.getSignedUrl('putObject', params);

  //Format of publicUrl that will be used to access the video
  var publicUrl = 'https://s3.amazonaws.com/' + params.Bucket + '/' + params.Key;

  res.send({preSignedUrl: preSignedUrl, publicUrl: publicUrl});  
};

//Get video by code and send video to client
var getVideo = function(req, res) {
  var code = req.query.code;
  console.log('Getting video with code:', code);
  db.Video.findOne({ 
    where: { code: code } 
  }).then(function(video) {
    res.send(video);
  });
};

//Create video with aws public url and uniq code
//Send code to client on success
var createVideo = function(req, res) {
  var url = req.body.publicUrl;
  var code = shortid.generate();
  console.log('Creating video with url:', url);
  db.Video.create({
    url: url,
    code: code
  })
  .then(function(video) {
    console.log('created video:', video);
    res.send({
      success: 'video created',
      code: video.code
    });
  });
};

module.exports = {
  generatePreSignedUrl: generatePreSignedUrl,
  getVideo: getVideo,
  createVideo: createVideo
};
