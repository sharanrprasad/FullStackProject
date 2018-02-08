'use strict';
const express = require("express");
const router = express.Router();
const userDB = require("../../models/userDB");
const errCodes = require("../../ProjectConstants");
const UserData = require("../../models/userData");
router.use(function (request, response, next) {
    console.log("signup Request Recieved Time");
    next();
});
router.get("/", function (request, response) {
    if (request.session.username) {
        userDB.GetUserDetails(request.session.username, (err, data) => {
            if (err == null) {
                console.log("[loginController.ts] user session found redirecting to user-home");
                response.locals.userData = data;
                response.redirect('/user-home');
                return;
            }
            response.render("signupLogin", {
                signup: true
            });
        });
    }
    else {
        response.render("signupLogin", {
            signup: true
        });
    }
});
router.post("/validate", function (request, response, next) {
    try {
        var userDataModel = new UserData(request.body.username, request.body.password, request.body.name, request.body.city);
        userDB.UserSignUp(userDataModel, (errStr, data) => {
            console.log("callback from sign up db got ", errStr);
            if (errStr == null) {
                request.session.username = userDataModel.username;
                response.render("userHome");
            }
            else if (errStr == errCodes.USER_ALREADY_PRESENT) {
                response.render("signupLogin", {
                    signup: true,
                    helpers: {
                        SignUpError: function () {
                            return "Username Already Exists Pls login or use a different email ";
                        }
                    }
                });
                return;
            }
            else {
                response.status(500).send("User Input data not correct");
            }
        });
    }
    catch (err) {
        response.status(500).send("User Input data not correct");
    }
});
module.exports = router;
//# sourceMappingURL=signupController.js.map