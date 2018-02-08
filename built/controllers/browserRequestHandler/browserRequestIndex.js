"use strict";
const express = require("express");
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const loginController = require("./loginController");
const signupController = require("./signupController");
const homePageController = require("./homePageController");
const myAccountController = require("./myAccountController");
const adminController = require("./adminController");
const router = express.Router();
router.use('/sign-in', loginController);
router.use('/sign-up', signupController);
router.use('/user-home', homePageController);
router.use('/user-myaccount', myAccountController);
router.use('/admin', adminController);
module.exports = router;
//# sourceMappingURL=browserRequestIndex.js.map