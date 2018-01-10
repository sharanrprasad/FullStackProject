"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const errCodes = require('../ProjectConstants');
const userWidgetDB = require('../models/userWidgetDB');
router.get("/", function (request, response) {
    console.log("[MyAccountController] my account request recieved");
    let username = request.session.username;
    let errAny = " ";
    if (response.locals.errStr != null) {
        errAny = "SomeThing Broke Please try buying Again";
    }
    response.render("userAccount", {
        helpers: {
            MyAccountError: function () {
                return errAny;
            },
            UserName: function () {
                return username;
            }
        }
    });
});
router.get("/user-widgets", function (request, response) {
    let username = request.session.username;
    console.log("[My AccountController : user-widgets] username requesting service is  ", username);
    userWidgetDB.GetUserPurchasedWidgets(username, (errStr, widgets) => {
        console.log(widgets);
        if (errStr == null) {
            let obj = {
                num: widgets.length,
                data: widgets
            };
            let jsonString = JSON.stringify(obj);
            response.setHeader('Content-Type', 'application/json');
            response.send(jsonString);
        }
        else {
            let obj = {
                num: 0,
                data: null
            };
            let jsonString = JSON.stringify(obj);
            response.setHeader('Content-Type', 'application/json');
            response.send(jsonString);
        }
    });
});
module.exports = router;
//# sourceMappingURL=myAccountController.js.map