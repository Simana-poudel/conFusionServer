var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
  req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
     passport.authenticate('local') (req, res, () => {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({success : true, status: 'Registration successful!'});
     });
    }
  })
});

router.post('/login', passport.authenticate('local'), (req, 
  res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 400;
  res.setHeader('Content-Type', 'application/json');
  res.json({success : true, token: token, status: 'Registration successful!'});
});

router.get('/logout',(req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    res.statusCode = 403;
    next(err);
  }
});
module.exports = router;
