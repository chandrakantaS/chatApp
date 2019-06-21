const express = require('express');
const router = express.Router();
const connect = require('../db/connect');
const User = require('../db/userModel');

router.get('/', function(req, res, next) {
  res.render('login', {msg: ''});
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
      if(user && user[0] && user[0].password === req.body.pass) {
        res.render('index', {login: true, user: req.body.username})
      } else {
        console.log('error auth');
        res.render('login', {msg: 'Failed to login'})
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
    res.render('login', {msg: 'Registration Success'});
  })
})

module.exports = router;
