const Sequelize = require('sequelize');
const config = require('./config');
const db = new Sequelize(config.database, config.username, config.password, {
  protocol: 'postgres',
  dialect: 'postgres',
  host: config.host,
});

// TODO implement User and User Auth
// var User = db.define('user', {
//   username: Sequelize.STRING,
//   password: Sequelize.STRING,
//   partnerId: Sequelize.INTEGER,
// });

const Video = db.define('video', {
  // Create a unique alphanumeric id
  code: Sequelize.STRING,
  url: Sequelize.STRING,
  // Allow for users to only be viewed by intended receiver
  // receiverId: Sequelize.INTEGER
});

// Setup User Video relationship
// Video.belongsTo(User);
// User.hasMany(Video);

const Question = db.define('question', {
  txt: Sequelize.STRING,
  // Allow for certain users to receive specific questions
  // receiverId: Sequelize.INTEGER
});

// Allow for users to create questions, setup relationship between user and questions
// Question.belongsTo(User);
// User.hasMany(Question);

// User.sync();
Video.sync();
Question.sync();

module.exports = {
  Video,
  Question,
};
