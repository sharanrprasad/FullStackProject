import * as express from "express";
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
import * as utils from '../../utils';
const cookieParser = require('cookie-parser');
const session = require('express-session');

import loginController = require("./loginController");
import signupController = require("./signupController");
import homePageController = require("./homePageController");
import myAccountController = require("./myAccountController");
import adminController = require("./adminController");


const router = express.Router();



router.use('/sign-in',loginController);

router.use('/sign-up',signupController);

router.use('/user-home',homePageController);

router.use('/user-myaccount',myAccountController);

router.use('/admin',adminController);




export = router;


