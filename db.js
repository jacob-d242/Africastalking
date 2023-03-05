const mongoose = require('mongoose');

const uri = 'mongodb+srv://Morachatech:QNAg1Jh9LY1NRLd2@cluster0.cnnv9.mongodb.net/test'; // Replace with your MongoDB URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err
  ));
  mongoose.set('strictQuery', true);

module.exports = mongoose.connection;
