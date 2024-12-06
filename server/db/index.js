const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/food-ordering", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((e) => {
    console.error("MongoDB connection error", e.message);
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('MongoDB database connection established successfully');
});

module.exports = db;
