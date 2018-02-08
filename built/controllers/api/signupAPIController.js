"use strict";
const userDB = require("../../models/userDB");
;
const errCodes = require('../../ProjectConstants');
const utils = require("../../utils");
const UserData = require('../../models/userData');
const express = require("express");
const router = express.Router();
router.post("/validate", function (request, response, next) {
    try {
        var userDataModel = new UserData(request.body.username, request.body.password, request.body.name, request.body.city);
        userDB.UserSignUp(userDataModel, (errStr, data) => {
            console.log("callback from sign up db got ", errStr);
            if (errStr == null) {
                let token = utils.GetNewUserToken(userDataModel.username);
                response.json(utils.ConstructMessage(errCodes.SUCCESS, { userdata: userDataModel, token: token }));
                return;
            }
            else {
                response.json(utils.ConstructMessage(errStr, { userdata: null, token: null }));
                return;
            }
        });
    }
    catch (err) {
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, { userdata: null, token: null }));
        return;
    }
});
module.exports = router;
//# sourceMappingURL=signupAPIController.js.map