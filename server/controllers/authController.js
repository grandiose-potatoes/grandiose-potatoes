var db = require('../db/db.js');
var bcrypt = require('bcrypt');
var session = require('express-session')

const saltRounds = 10;

var getUser = function(username) {
  return db.User.findOne({
    where: {
      username: username
    }
  }).then(function(user) {
    return user
  })
}

var createUser = function(username, password) {
  return db.User.create({
    username: username,
    password: password
  }).then(function(user) {
    return user
  })
}

var hashPassword = function(password) {
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if(err) {
      throw err
    } else {
      return hash
    }
  })
}

var signup = function(req, res) {
  var username = req.body.username
  var password = req.body.password
  // console.log('first', password)
  db.User.findOne({
    where: {
      username: username
    } 
  }).then(function(user) {
    // console.log('last', password)
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
      console.log('new user has been created')
      res.send('/record')
    } else {
      console.log('this user has alredy been in the database')
      res.send('/signup')
    }
  })
}

var login = function(req, res) {
  console.log('test this out', req.body)
  var username = req.body.username;
  var password = req.body.password;
  db.User.findOne({
    where: {
      username: username
    }
  }).then(function(user) {
    if(user !== null) {
      bcrypt.compare(password, user.password, function(err, results) {
        if(err) { throw err
        } else if (results) {
          req.session.regenerate(function() {
            req.session.userID = username
          })
          console.log('your password matches what we have on record')
          res.send('/record')
        } else {
          console.log('your password does not match what we have on record')
          res.send('/login')
        }
      })
    } else {
      console.log('there is no user in our database with that user')
      res.send('/login')
    }
  })
}


module.exports = {
  signup: signup,
  login: login,
};