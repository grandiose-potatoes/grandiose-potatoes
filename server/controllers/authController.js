var db = require('../db/db.js');
var bcrypt = require('bcrypt');
var session = require('express-session')

// app.use(session({
//   secret: 'secret passcode'
// }))
const saltRounds = 10;

var signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username)
  console.log(password)
  // check to see if the username is in the database
  db.User.findOne({
    where: { 
      username: username
    }
  }).then(function(userID) {
    // if it is not in the database
    if(userID === null) {
      // hash the password
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err) {
          console.log('There was an error in the hasing function: signin')
        } else { // add user & password to database
          db.User.create({
            username: username,
            password: hash
          })
        }
      })
      // set a session for user
      req.session.regenerate(function(err) {
        // redirect them to homepage
        res.redirect('/homepage')
      })

    } else { // if user is in the database
      // send user back to the login page with the message that that username has already been taken
      res.redirect('/signup')
    }
  })
}

var login = function(req, res) {
  // check to see if the user is in the database
    // if user is in the dataabe
      // check to see if the matches the hashed password in the database
        // if password matches, create a session
      // if passwords to not match
        // redirect to login page
    // if user is not in the database
      // redirect to login page  
}


module.exports = {
  signup: signup,
  login: login,
};