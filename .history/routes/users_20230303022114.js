const bodyParser = require('body-parser');
var User = require('../models/users');

const { ensureAuthenticated } = require('../config/auth')

var passport = require('passport');

var express = require('express');
const userController = require('../controllers/userController')
var userRouter = express.Router();
userRouter.use(bodyParser.json());


/* GET users listing. */
userRouter.route('/')
  .get(userController.index)
  .post(userController.regist)
userRouter
  .route('/login')
  .get(userController.login)
  .post(userController.signin)
userRouter
  .route('/logout')
  .get(userController.signout)
userRouter.route('/dashboard')
  .get(ensureAuthenticated, userController.dashboard)


userRouter.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, status: 'Registration Successful!' });
        });
      }
    });
});

userRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, status: 'You are successfully logged in!' });
});


module.exports = userRouter;
