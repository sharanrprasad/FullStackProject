import * as express from "express";
import * as utils from '../../utils';
import adminRestController = require('./adminRestController');
import homePageRestController = require('./homePageRestController');
import myAccountRestController = require('./myAccountRestController');
const bodyParser = require("body-parser");




const router = express.Router();

//bodyparser
router.use(bodyParser.json());

router.use(utils.CheckTokenAuth);

router.use("/admin",adminRestController);


router.use('/user-home',homePageRestController);

router.use('/user-myaccount',myAccountRestController);


export = router;


