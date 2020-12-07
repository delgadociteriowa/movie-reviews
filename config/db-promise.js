// This files uses mongoose to connect with the db
const mongoose = require('mongoose');

// to get the global variables
const config = require('config');

// The url for connection
const db = config.get('mongoURI');

const connectDB = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error(err.message);
    process.exit(1)
  })
}

module.exports = connectDB;