"use strict";
const express = require("express");
const errCodes = require("../../ProjectConstants");
const widgetDB = require("../../models/widgetDB");
const userWidgetDB = require("../../models/userWidgetDB");
const userDB = require("../../models/userDB");
const utils = require("../../utils");
const utils_1 = require("../../utils");
const weather = require('weather-js');
const router = express.Router();
router.get("/get-widgets", function (request, response) {
    widgetDB.GetAllWidgetsData((errStr, data) => {
        if (errStr == null) {
            errStr = errCodes.SUCCESS;
        }
        response.json(utils.ConstructMessage(errStr, { widgets: data }));
    });
});
router.get("/get-widgets-user", function (request, response) {
    let username = request.headers["x-user-name"];
    if (username == null) {
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
        return;
    }
    try {
        widgetDB.GetAllWidgetsWithBrought(username, (errStr, data) => {
            if (errStr == null) {
                errStr = errCodes.SUCCESS;
            }
            response.json(utils.ConstructMessage(errStr, { widgets: data }));
        });
    }
    catch (err) {
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
    }
});
router.post("/buy-widget", function (request, response, next) {
    let username = request.headers["x-user-name"];
    let widgetIDs = request.body.ids;
    if (username == null || widgetIDs == null) {
        console.log("[HomePageController: username or widget id is null]", username, widgetIDs);
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
    }
    else if (widgetIDs.length == 0) {
        response.json(utils.ConstructMessage(errCodes.CART_EMPTY, {}));
    }
    else {
        console.log("[HomePageController:/Buy Widget username and ids is", username, widgetIDs);
        next();
    }
}, function (request, response) {
    let username = request.headers["x-user-name"];
    let widgetIDs = request.body.ids;
    userWidgetDB.BuyWidget(username, widgetIDs, (errStr, result) => {
        if (errStr == null) {
            userWidgetDB.RemoveFromCartMutiple(username, widgetIDs, (err, data) => {
                if (err == null) {
                    err = errCodes.SUCCESS;
                }
                response.json(utils_1.ConstructMessage(err, { result: data }));
            });
        }
        else {
            response.json(utils_1.ConstructMessage(errStr, { result: result }));
        }
    });
});
router.post("/add-to-cart", function (request, response, next) {
    let widgetID = request.body.widgetId;
    let username = request.headers["x-user-name"];
    if (username == null || widgetID == null) {
        console.log("[HomePageController Add to cart : username or widget id is null]", username, widgetID);
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
        return;
    }
    userWidgetDB.AddToCart(username, widgetID, (errStr, result) => {
        if (errStr == null)
            errStr = errCodes.SUCCESS;
        response.json(utils_1.ConstructMessage(errStr, { result: result }));
    });
});
router.get("/get-cart", function (request, response, next) {
    let username = request.headers['x-user-name'];
    if (Array.isArray(username)) {
        username = username[0];
    }
    if (username == null) {
        console.log("[HomePageController GetCart : username  is null]");
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
        return;
    }
    userWidgetDB.GetUserCartItems(username, (errStr, result) => {
        if (errStr == null)
            errStr = errCodes.SUCCESS;
        response.json(utils_1.ConstructMessage(errStr, { widgets: result }));
    });
});
router.post("/remove-from-cart", function (request, response, next) {
    try {
        let username = request.headers["x-user-name"];
        if (Array.isArray(username)) {
            username = username[0];
        }
        let id = request.body.widgetId;
        userWidgetDB.RemoveFromCart(username, id, (errStr, data) => {
            if (errStr == null)
                errStr = errCodes.SUCCESS;
            response.json(utils_1.ConstructMessage(errStr, data));
        });
    }
    catch (err) {
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
    }
});
router.get("/get-weather", function (request, response) {
    console.log("[HomePageControllerRest API] Get Weather called");
    try {
        let username = request.headers["x-user-name"];
        userDB.GetUserDetails(username, (err, data) => {
            weather.find({ search: data.city, degreeType: 'C' }, function (err, result) {
                if (err) {
                    console.log("[Error in getting weather]", err);
                    response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
                }
                else {
                    console.log("Weather data is ", result);
                    response.json(utils.ConstructMessage(errCodes.SUCCESS, result));
                }
            });
        });
    }
    catch (e) {
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
    }
});
module.exports = router;
//# sourceMappingURL=homePageRestController.js.map