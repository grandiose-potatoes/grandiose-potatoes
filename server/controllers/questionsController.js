const db = require('../db/db.js');

// Return all questions from the database
function getQuestions(req, res) {
  db.Question.findAll().then((questions) => {
    res.send(questions);
  });
}

// Create a question
function createQuestion(req, res) {
  const question = req.body.txt;

  db.Question.create({ txt: question })
    .then((result) => {
      res.end();
    });
}

module.exports = {
  getQuestions,
  createQuestion,
};
