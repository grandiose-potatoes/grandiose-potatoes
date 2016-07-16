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

var db = new Sequelize('greenfield', 'root', 'io', {
  host: 'localhost', 
  dialect: 'mysql'
})

var User = db.define('user', {
  username: Sequelize.STRING, 
  password: Sequelize.STRING,
  partnerId: Sequelize.INTEGER   
});

var Video = db.define('video', {
  url: Sequelize.STRING, 
  receiverId: Sequelize.INTEGER  
});

Video.belongsTo(User); 
User.hasMany(Video);

var Question = db.define('question', {
  txt: Sequelize.STRING, 
  receiverId: Sequelize.INTEGER
});

Question.belongsTo(User); 
User.hasMany(Question); 

User.sync(); 
Video.sync(); 
Question.sync(); 

module.exports = {
  User: User, 
  Video: Video, 
  Question: Question
}