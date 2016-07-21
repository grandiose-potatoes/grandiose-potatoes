var questionsController = require('./controllers/questionsController.js');
var videosController = require('./controllers/videosController.js');
var homeController = require('./controllers/homeController.js');
var router = require('express').Router();

router.get('/api/questions', questionsController.getQuestions);
router.post('/api/questions', questionsController.createQuestions);

// router.get('/api/presigned', controller.videos.presigned)  
// router.get('/api/videos', controller.videos.get);
// router.post('/api/videos', controller.videos.post);

// router.get('/videos/*', controller.home.get);
// router.get('/record', controller.home.get);

//TODO
//Handle unknown routes;
//router.get(*, errorHandler);

module.exports = router;
