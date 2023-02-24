const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
  phone: String,
  id: String,
  pin: String
});

module.exports = mongoose.model('Commission', commissionSchema);
