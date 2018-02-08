"use strict";
const express = require("express");
const router = express.Router();
const LoginData = require("../../models/loginData");
const userDB = require("../../models/userDB");
;
const errCodes = require('../../ProjectConstants');
router.use(function (request, response, next) {
    console.log("[LoginController:]Home");
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
                login: true
            });
        });
    }
    else {
        response.render("signupLogin", {
            login: true
        });
    }
});
router.post("/validate", function (request, response) {
    try {
        var loginData = new LoginData(request.body.username, request.body.password);
        console.log("[LoginController]: validate request recieved for username and password ", loginData.username, loginData.password);
        userDB.GetUserDetails(loginData.username, (err, userDataModel) => {
            if (err == errCodes.USER_NOT_PRESENT) {
                response.render("signupLogin", {
                    login: true,
                    helpers: {
                        LoginError: function () { return 'Email Address not registered Pls Sign Up'; }
                    }
                });
                return;
            }
            else if (loginData.password !== userDataModel.password) {
                console.log("[Password Incorrect ] ", loginData.password, userDataModel.password);
                response.render("signupLogin", {
                    login: true,
                    helpers: {
                        LoginError: function () { return 'Incorrect Password Pls Try Again'; }
                    }
                });
                return;
            }
            else {
                request.session.username = loginData.username;
                response.render("userHome");
            }
        });
    }
    catch (err) {
        response.redirect("../");
    }
});
module.exports = router;
//# sourceMappingURL=loginController.js.map