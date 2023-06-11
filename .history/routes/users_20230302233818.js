const bodyParser = require('body-parser');
var User = require('../models/user');

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




module.exports = userRouter;
