var db = require('../db/db.js');

var getQuestions = function(req, res) {
  db.Question.findAll().then(function(questions) {
    res.send(questions);
  });
}

var createQuestions = function(req, res) {
  var question = req.body.txt
  db.Question.create({txt: question})
    .then(function(question) {
    res.end();
  })
}

module.exports = {
  getQuestions: getQuestions,
  createQuestions: createQuestions
}

