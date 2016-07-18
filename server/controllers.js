var models = require('./db/db');

module.exports = {

  questions: {
    get: function(req, res) {
      db.Question.findAll().then(function(questions) {
        res.send(questions);
      });
    },
    post: function(req, res) {
      var question = req.body.txt;
      db.Question.create({txt: question})
        .then(function(question) {
        res.end();
      })
    }
  },

};
