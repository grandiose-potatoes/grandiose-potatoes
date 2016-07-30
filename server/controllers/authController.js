const db = require('../db/db.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

function getUser(username) {
  return db.User.findOne({
    where: {
      username,
    },
  });
}

function createUser(username, password) {
  return db.User.create({
    username,
    password,
  });
}

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

function comparePassword(inputRawPassword, dbHashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(inputRawPassword, dbHashedPassword, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

function createSession(req, res, user) {
  return req.session.regenerate(() => {
    req.session.user = user;
    res.send('/profile');
  });
}

function signup(req, res) {
  getUser(req.body.username)
  .then((user) => {
    if (user === null) { // if no user in database...
      hashPassword(req.body.username)
      .then((hash) => {
        createUser(req.body.username, hash)
        .then((userObj) => {
          createSession(req, res, userObj.username);
        });
      });
    } else { // user is already in database
      res.send('/signup');
    }
  });
}

function login(req, res) {
  getUser(req.body.username)
  .then((user) => {
    if (user !== null) {
      comparePassword(req.body.password, user.password)
      .then((success) => {
        if (success) {
          createSession(req, res, user.username);
        } else { // password does not match
          res.send('/profile');
        }
      });
    } else { // user is not in db
      res.send('/login');
    }
  });
}

module.exports = {
  signup,
  login,
};
