const mongoose = require('mongoose');
const UserShema = new mongoose.Schema({
  facebookId: String,
  accessToken: String,
  name: String,
});

const User = mongoose.model('User', UserShema);
module.exports = User;
