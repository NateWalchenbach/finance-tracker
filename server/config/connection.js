const mongoose = require("mongoose");

mongoose.connect(
  process.env.DATABASE ||
    "mongodb+srv://natewalchenbach:N1U0XMmQtTW7t3x0@cluster0.rcjod.mongodb.net/Cluster0?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
