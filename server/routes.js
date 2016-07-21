var controller = require('./controllers.js');
var router = require('express').Router();

router.get('/api/questions', controller.questions.get);
router.post('/api/questions', controller.questions.post);

router.get('/api/presigned', controller.videos.presigned)  
router.get('/api/videos', controller.videos.get);
router.post('/api/videos', controller.videos.post);

router.get('*', controller.home.get);

module.exports = router;
