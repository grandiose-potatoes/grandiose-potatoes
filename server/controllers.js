var db = require('./db/db');

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

  users: {
    get: function(req, res) {
      //user validation
    },
    post: function(req, res) {
      //check if username already exists
        //if so send respond to client to type new username
      //else
        //create new userObject, hash password, etc.
        //write to database
    }
  },
  
  videos: {
    get: function(req, res) {},
    post: function(req,res) {}
  }
};
