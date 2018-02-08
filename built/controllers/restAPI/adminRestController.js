"use strict";
const express = require("express");
const bodyParser = require('body-parser');
const userDB = require("../../models/userDB");
const UserData = require("../../models/userData");
const utils = require("../../utils");
const errorCodes = require("../../ProjectConstants");
const router = express.Router();
router.post("/validate", function (request, response) {
    console.log("[RestAdminController: Validate Admin Login] request recieved");
    try {
        let username = request.body.username;
        let password = request.body.password;
        if (username != "admin@admin.com") {
            response.json(utils.ConstructMessage(errorCodes.USER_NOT_PRESENT, {}));
        }
        else if (password != "admin@123") {
            response.json(utils.ConstructMessage(errorCodes.INCORRECT_PASSWORD, {}));
        }
        else {
            let token = utils.GetNewUserToken(username);
            response.json(utils.ConstructMessage(errorCodes.SUCCESS, { token: token }));
        }
    }
    catch (err) {
        response.json(utils.ConstructMessage(errorCodes.USER_NOT_PRESENT, {}));
    }
});
router.post("/get-user", function (request, response) {
    try {
        console.log("[AdminControllerRest: Get - Users] request recieved", request.body.searchname);
        let searchUsername = request.body.searchname || "";
        userDB.MatchAndGetAllUserData(searchUsername, (err, result) => {
            if (err == null)
                err = errorCodes.SUCCESS;
            response.json(utils.ConstructMessage(err, { users: result }));
        });
    }
    catch (err) {
        console.log(err.stack);
        var arr = [];
        response.json(utils.ConstructMessage(errorCodes.GENERIC_ERROR, { users: arr }));
    }
});
router.post("/update-user", function (request, response) {
    try {
        console.log("[AdminController: Update - Users] request recieved", request.body.name);
        var userDataModel = new UserData(request.body.username, request.body.password, request.body.name, request.body.city);
        userDB.UpdateUserDetails(userDataModel, (errStr, data) => {
            if (errStr == null) {
                errStr = errorCodes.SUCCESS;
            }
            response.json(utils.ConstructMessage(errStr, data));
        });
    }
    catch (err) {
        console.log("[Error Admin Update User Function] ", err.stack);
        var arr = [];
        response.json(utils.ConstructMessage(errorCodes.GENERIC_ERROR, arr));
    }
});
router.post("/delete-user", function (request, response) {
    let username = request.body.username;
    console.log("[AdminController: User Deletion request recieved for]", username);
    try {
        userDB.DeleteUser(username, (err, result) => {
            if (err == null) {
                err = errorCodes.SUCCESS;
            }
            response.json(utils.ConstructMessage(err, result));
        });
    }
    catch (err) {
        var emptyObject = {};
        response.json(utils.ConstructMessage(errorCodes.GENERIC_ERROR, emptyObject));
    }
});
module.exports = router;
//# sourceMappingURL=adminRestController.js.map