const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  }
});
let User = mongoose.model('User', userSchema);
module.exports = User;
