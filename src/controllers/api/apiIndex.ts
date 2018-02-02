import * as express from "express";
import * as utils from '../../utils';
import loginController = require('./loginAPIController');
import signUpController = require('./signupAPIController');

const router = express.Router();

router.use('/sign-in',loginController);

router.use('/sign-up',signUpController);

export  = router;