const mongoose = require('mongoose');

async function connectMongoDb(url) {
  return mongoose
    .connect(url)
    .then(() => console.log('Connected to database!'))
    .catch(() => console.log('Connection failed!'));
}

module.exports = { connectMongoDb };
