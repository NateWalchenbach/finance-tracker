const mongoose = require('mongoose');

mongoose.connect(
  process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD) || 'mongodb://127.0.0.1:27017/portfolio',
  
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;