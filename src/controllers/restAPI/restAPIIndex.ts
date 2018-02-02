import * as express from "express";
import * as utils from '../../utils';
import adminRestController = require('./adminRestController');
import homePageRestController = require('./homePageRestController');
import myAccountRestController = require('./myAccountRestController');



const router = express.Router();

router.use(utils.CheckTokenAuth);

router.use("/admin",adminRestController);


router.use('/user-home',homePageRestController);

router.use('/user-myaccount',myAccountRestController);


export = router;


