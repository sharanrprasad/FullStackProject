"use strict";
const express = require("express");
const loginController = require("./loginAPIController");
const signUpController = require("./signupAPIController");
const bodyParser = require("body-parser");
const router = express.Router();
//bodyparser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use('/sign-in', loginController);
router.use('/sign-up', signUpController);
module.exports = router;
//# sourceMappingURL=apiIndex.js.map