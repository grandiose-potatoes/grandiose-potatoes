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

// var signup = function(req, res) {
//   var username = req.body.username;
//   var password = req.body.password;
//   var hashedPassword
//   console.log('ahhhh real monsters', getUser(username))
//   getUser(username) {
//     hashedPassword = hashPassword(password)
//     // var newUser = createUser(username, hashedPassword)
//     // createUser(username, hashedPassword)
//       // .then(function(user) {

//       // });

//     return db.User.create({
//       username: username,
//       password: hashedPassword
//     })
//     .then(function(user) {
//       req.session.regenerate(function() {
//         // req.session.userID = newUser.username
//         req.session.save()
//       })
//     })
//   } else { 
//   }
// }

// var login = function(req, res) {
//   var username = req.body.username;
//   var password = req.body.password;
//   var userID = getUser(username);
  // if(user) { // if user is in the dataabe
    // check to see if the matches the hashed password in the database
    
  

        // if password matches, create a session
      // if passwords to not match
        // redirect to login page
    // if user is not in the database
      // redirect to login page  
// }


// module.exports = {
  // signup: signup,
  // login: login,
// };