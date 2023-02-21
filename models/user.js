const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: String,
    id: Number,
    KraPin: String
})

const User = mongoose.model('User',userSchema);
module.exports = User
