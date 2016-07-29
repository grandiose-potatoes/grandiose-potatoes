var db = require('../db/db.js');
var bcrypt = require('bcrypt');
var session = require('express-session')

const saltRounds = 10;

var getUser = function(username) {
  return db.User.findOne({
    where: {
      username: username
    }
  })
}

var createUser = function(username, password) {
  return db.User.create({
    username: username,
    password: password
  })
}

var hashPassword = function(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if(err) {
        reject(err)
      } else {
        resolve(hash)
      }
    })
  })
}

var comparePassword = function(inputRawPassword, dbHashedPassword) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(inputRawPassword, dbHashedPassword, function(err, response) {
      if(err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

var createSession = function(req, res, user) {
  return req.session.regenerate(function() {
    req.session.user = user
    res.send('/home')
  })
}

var signup = function(req, res) {
  getUser(req.body.username)
  .then(function(user) {
    if(user === null) { // if no user in database...
      hashPassword(req.body.username)
      .then(function(hash) { 
        createUser(req.body.username, hash)
        .then(function(user) {
          createSession(req, res, user.username)
        })
      })
    } else { // user is already in database
      res.send('/signup')
    }
  })
}

var login = function(req, res) {
  getUser(req.body.username)
  .then(function(user) {
    if(user !== null) {
      comparePassword(req.body.password, user.password)
      .then(function(success) {
        if(success) {
          createSession(req, res, user.username)
        } else { // password does not match
          res.send('/login')
        }
      })
    } else { // user is not in db
    res.send('/login')
  }
})

}


module.exports = {
  signup: signup,
  login: login,
};