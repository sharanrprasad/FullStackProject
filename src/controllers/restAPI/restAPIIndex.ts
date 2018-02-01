import * as express from "express";
import * as utils from '../../utils';
import adminRestController = require('./adminRestController');
import loginRestController = require('./loginRestController');
import signupRestController = require('./signupRestController');
import homePageRestController = require('./homePageRestController');
import myAccountRestController = require('./myAccountRestController');



const router = express.Router();

router.use(utils.CheckTokenAuth);

router.use("/admin",adminRestController);

router.use('/sign-in',loginRestController);

router.use('/sign-up',signupRestController);

router.use('/user-home',homePageRestController);

router.use('/user-myaccount',myAccountRestController);


export = router;


