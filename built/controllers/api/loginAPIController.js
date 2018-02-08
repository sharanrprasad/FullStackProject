"use strict";
const express = require("express");
const LoginData = require("../../models/loginData");
const userDB = require("../../models/userDB");
;
const errCodes = require('../../ProjectConstants');
const utils = require("../../utils");
const router = express.Router();
router.use(function (request, response, next) {
    console.log("[RestLoginController:]Home");
    next();
});
router.post("/validate", function (request, response) {
    try {
        var loginData = new LoginData(request.body.username, request.body.password);
        console.log("[LoginController]: validate request recieved for username and password ", loginData.username, loginData.password);
        userDB.GetUserDetails(loginData.username, (err, userDataModel) => {
            if (err != null) {
                response.json(utils.ConstructMessage(err, { userdata: null }));
                return;
            }
            else if (loginData.password != userDataModel.password) {
                response.json(utils.ConstructMessage(errCodes.INCORRECT_PASSWORD, { userdata: null }));
                return;
            }
            else {
                let token = utils.GetNewUserToken(userDataModel.username);
                response.json(utils.ConstructMessage(errCodes.SUCCESS, { userdata: userDataModel, token: token }));
            }
        });
    }
    catch (err) {
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, { userdata: null }));
        return;
    }
});
module.exports = router;
//# sourceMappingURL=loginAPIController.js.map