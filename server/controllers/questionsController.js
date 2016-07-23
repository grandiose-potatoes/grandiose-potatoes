var db = require('../db/db.js');


//return all questions from the database
var getQuestions = function(req, res) {
  db.Question.findAll().then(function(questions) {
    //console.log(questions[0].dataValues.txt);
    res.send(questions);
  });
};

//Create a question 
var createQuestion = function(req, res) {
  var question = req.body.txt;
  db.Question.create({txt: question})
    .then(function(question) {
      res.end();
    });
};

module.exports = {
  getQuestions: getQuestions,
  createQuestion: createQuestion
};

