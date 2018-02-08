"use strict";
const express = require("express");
const router = express.Router();
const errCodes = require("../../ProjectConstants");
const userWidgetDB = require("../../models/userWidgetDB");
const utils = require("../../utils");
const userDB = require("../../models/userDB");
router.get("/user-widgets", function (request, response) {
    let username = request.headers["x-user-name"];
    console.log("[My AccountControllerRest  : user-widgets] username requesting service is  ", username);
    userWidgetDB.GetUserPurchasedWidgets(username, (errStr, widgets) => {
        console.log(widgets);
        if (errStr == null) {
            let obj = {
                num: widgets.length,
                widgets: widgets //TODO changed name here from data to widgets pls check
            };
            response.json(utils.ConstructMessage(errCodes.SUCCESS, obj));
        }
        else {
            let obj = {
                num: 0,
                data: []
            };
            response.json(utils.ConstructMessage(errStr, obj));
        }
    });
});
router.get("/user-data", function (request, response) {
    try {
        let username = request.headers['x-user-name'];
        if (username == null) {
            response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
            return;
        }
        userDB.GetUserDetails(username, (errStr, userData) => {
            if (errStr == null) {
                errStr = errCodes.SUCCESS;
            }
            response.json(utils.ConstructMessage(errStr, userData));
        });
    }
    catch (err) {
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
    }
});
module.exports = router;
//# sourceMappingURL=myAccountRestController.js.map