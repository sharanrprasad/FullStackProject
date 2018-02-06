import * as express from "express";
import * as utils from '../../utils';
import loginController = require('./loginAPIController');
import signUpController = require('./signupAPIController');
const bodyParser = require("body-parser");

const router = express.Router();

//bodyparser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use('/sign-in',loginController);

router.use('/sign-up',signUpController);

export  = router;