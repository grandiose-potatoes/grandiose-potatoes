var controller = require('./controllers');
var router = require('express').Router();

router.post('/api/questions', controller.questions.post);
router.get('/api/questions', controller.questions.get)

module.exports = router;
