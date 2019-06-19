const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/chatapp', {useNewUrlParser: true})
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

router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/', function(req, res, next) {
  console.log('new login');
  connect.then(db => {
    console.log('DB connected: ', req.body);
    User.find({username: req.body.username}).then(user => {
      console.log('user: ', user);
      if(user[0].password === req.body.pass) {
        res.render('index', {login: true, user: req.body.username})
      } else {
        console.log('error auth');
        res.status(403).redirect('/login')
      }
    })
  })
});
router.post('/register', (req, res, next) => {
  console.log('new user');
  connect.then(db => {
    console.log('DB connected: ', req.body);
    let nUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.pass1
    });
    nUser.save();
    res.redirect('/');
  })
})

module.exports = router;
