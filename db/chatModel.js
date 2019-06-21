const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema({
  from: {
    type: String
  },
  msg: {
    type: String
  }
});
let Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
