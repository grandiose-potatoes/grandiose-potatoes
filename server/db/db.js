// In order to create the DB, start in Terminal:
// mysql.server start
// mysql -u root -p

// mysql shell commands:
// show databases;
// show tables;
// create database <database name>
// use <database>
// DESCRIBE <table name> //verify the set-up of a new table

var Sequelize = require('sequelize'); 

//If production use production database
if (process.env.DATABASE_URL) {
  var db = new Sequelize(process.env.DATABASE_URL, {
    host: process.env.DATABASE_HOST, 
    dialect: 'mysql'
  })
} else {
  //Change the arguments to sequelize as neccessary ('Database', 'username', 'password')
  var db = new Sequelize('greenfield', 'root', 'io', {
    host: 'localhost', 
    dialect: 'mysql'
  })
}


// TODO implement User and User Auth
// var User = db.define('user', {
//   username: Sequelize.STRING, 
//   password: Sequelize.STRING,
//   partnerId: Sequelize.INTEGER   
// });

var Video = db.define('video', {
  //Create a unique alphanumeric id
  code: Sequelize.STRING,
  url: Sequelize.STRING
  //Allow for users to only be viewed by intended receiver
  // receiverId: Sequelize.INTEGER  
});


//Setup User Video relationship
// Video.belongsTo(User); 
// User.hasMany(Video);

var Question = db.define('question', {
  txt: Sequelize.STRING
  // Allow for certain users to receive specific questions
  // receiverId: Sequelize.INTEGER 
});


//Allow for users to create questions, setup relationship between user and questions
// Question.belongsTo(User); 
// User.hasMany(Question); 

// User.sync(); 
Video.sync(); 
Question.sync(); 

module.exports = {
  Video: Video, 
  Question: Question
}