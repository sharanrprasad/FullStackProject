"use strict";
const express = require("express");
const utils = require("../../utils");
const adminRestController = require("./adminRestController");
const homePageRestController = require("./homePageRestController");
const myAccountRestController = require("./myAccountRestController");
const bodyParser = require("body-parser");
const router = express.Router();
//bodyparser
router.use(bodyParser.json());
router.use(utils.CheckTokenAuth);
router.use("/admin", adminRestController);
router.use('/user-home', homePageRestController);
router.use('/user-myaccount', myAccountRestController);
module.exports = router;
//# sourceMappingURL=restAPIIndex.js.map