var db = require('../db/db.js');

var signup = function(req, res) {
  // check to see if the username is in the database
    // if it is not in the database
      // hash the password
      // add user & password to database
      // set a session for user
      // redirect them to homepage
    // if user is in the database
      // send user back to the login page with the message that that username has already been taken
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