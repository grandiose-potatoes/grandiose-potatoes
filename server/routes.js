var questionsController = require('./controllers/questionsController.js');
var videosController = require('./controllers/videosController.js');
var homeController = require('./controllers/homeController.js');
var authController = require('./controllers/authController.js');
var router = require('express').Router();
var db = require('./db/db.js');
var bcrypt = require('bcrypt')

var session = require('express-session')

var saltRounds = 10

router.get('/api/questions', questionsController.getQuestions);
router.post('/api/questions', questionsController.createQuestion);

router.get('/api/presigned', videosController.generatePreSignedUrl);
router.get('/api/videos', videosController.getVideo);
router.post('/api/videos', videosController.createVideo);

// signup
router.post('/api/signup', function(req, res) {
  var username = req.body.username
  var password = req.body.password
  console.log('first', password)
  db.User.findOne({
    where: {
      username: username
    } 
  }).then(function(user) {
    console.log('last', password)
    if(user === null) {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err) { throw err 
        } else {
          return db.User.create({
            username: username,
            password: hash
          })
          .then(
            function(user) {
              req.session.regenerate(function() {
                req.session.userID = user.username
              })
            }
          )
        }
      })
    } else {
    }
  })
})
router.post('/api/login', function(req, res) {
  console.log('test this out', req.body)
  var username = req.body.username;
  var password = req.body.password;
  console.log(password)
  db.User.findOne({
    where: {
      username: username
    }
  }).then(function(user) {
    if(user !== null) {
      bcrypt.compare(password, user.password, function(err, res) {
        if(err) { throw err
        } else if (res) {
          console.log('your password matches what we have on record', res)
          req.session.regenerate(function() {
            req.session.userID = username
            console.log(req.session)
          })
        } else {
          console.log('your password does not match what we have on record')
        }
      })
    } else {
      console.log('there is no user in our database with that user')
    }
  })
})

//Send homepage when users route to videos or record endpoint
//React Router will handle showing the appropriate views
router.get('/videos/*', homeController.sendHome);
router.get('/record', homeController.sendHome);
router.get('/login', homeController.sendHome);
router.get('/signup', homeController.sendHome);

//TODO
//Handle unknown routes;
//router.get(*, errorHandler);

module.exports = router;
