const mongoose = require("mongoose");

mongoose.connect(
  process.env.DATABASE ||
    "mongodb+srv://kdouts:oi7ke6lSZb8mIqLv@cluster0.rcjod.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
