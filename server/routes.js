var controller = require('./controllers.js');
var router = require('express').Router();

router.get('/api/questions', controller.questions.get);
router.post('/api/questions', controller.questions.post);

router.get('/api/videos', controller.videos.get);
router.post('/api/videos', controller.videos.post);

router.post('/api/users/signup', controller.users.post);
router.get('/api/users/signin', controller.users.get);

router.get('*', controller.home.get);

module.exports = router;
