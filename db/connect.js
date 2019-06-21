const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/chatapp', {useNewUrlParser: true})
module.exports = connect;
