const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String,
  userFamilyName: String,
  userEmail: String,
  userAvatar: String
})

const User = mongoose.model('User', userSchema);
module.exports = User;