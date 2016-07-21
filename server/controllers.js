var path = require('path');
var db = require('./db/db');
var AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY});
AWS.config.update({region: 'us-east-1'});
var shortid = require('shortid');

// teammates: please create a config.js file in the same directory and paste the code below 
// module.exports = {
//   accessKeyId: 'in Slack or speak to Edmund',
//   secretAccessKey: 'in Slack or speak to Edmund',
// };

module.exports = {

  questions: {
    get: function(req, res) {
      db.Question.findAll().then(function(questions) {
        res.send(questions);
      });
    },
    post: function(req, res) {
      var question = req.body.txt
      db.Question.create({txt: question})
        .then(function(question) {
        res.end();
      })
    }
  },
  
  videos: {
    get: function(req, res) {
      console.log('in the get');
      console.log(req.query);
      var code = req.query.code
      db.Video.findOne({ 
        where: { code: code } 
      }).then(function(video) {
        res.send(video);
      })
    },
    post: function(req,res) {
      var url = req.body.publicUrl;
      var code = shortid.generate();
      db.Video.create({
        url: url,
        code: code
      })
      .then(function(video) {
        console.log('created video:', video)
        res.send({
          success: 'video created',
          code: video.code
        });
      })
    },
    presigned: function(req, res) {
      //Generate unique filename for video
      var awsFilename = Date.now() + '-' + shortid.generate();
      // Get pre-signed URL from S3 then send back to client and client will do the PUT request to S3
      // pre-signed URL will be valid for 600 seconds 
      var s3 = new AWS.S3();
      var params = {
        //Setup with your bucket name
        Bucket: 'greenfield-hr44', 
        Key: awsFilename, 
        ContentType: 'video/webm',
        ACL: 'public-read', 
        Expires: 600
      }; // this is the time which the URL is available for putting file
      
      var preSignedUrl = s3.getSignedUrl('putObject', params);

      //Format of publicUrl
      var publicUrl = 'https://s3.amazonaws.com/'+ params.Bucket +'/' + params.Key;

      res.send({preSignedUrl: preSignedUrl, publicUrl: publicUrl});  
    }
  },

  home: {
    //Send static index for all uncaught routes
    get: function(req, res) {
      console.log('in the home');
      res.sendFile(path.resolve(__dirname + '/../client/index.html'));
    }
  }



};
