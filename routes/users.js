var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const User = mongoose.model('users');

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({},(error, users) => {
    if(error){ res.status(422).send('error during user creation')};
    res.send(users);
  })
});

router.post('/signup', (req, res, next) => {
  User.find({
    email: req.body.email
  }, (error, user) => {
    if(error){ res.status(422).send('error during user creation: check if user already exist')};
    if(user.length == 0){
      var newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      }).save((error, user) => {
        console.log("le nouveau user est ",user);
        if(error){ res.status(422).send('error during user creation: create user')};
        res.send('User created');
      })
    } else {
      res.send('User already existing in database');
    }
  })
});

router.post('/signin', (req, res, next) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, (error, user) => {
    console.log("on est là!");
    if(error){ res.status(422).send('error during user creation: check if user already exist')};
    if(user){
      res.send('User is loged in');
    } else {
      res.send('Email or password is invalid');
    }
  })
});

router.post('/signout', (req, res, next) => {
  res.send('user is signed out');
});


module.exports = router;
