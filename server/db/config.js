module.exports = {
  database: process.env.DATABASE_URL || 'vime',
  username: null,
  password: null,
  host: process.env.DATABASE_URL ? process.env.DATABASE_URL.split(':')[2] : 'localhost',
};
