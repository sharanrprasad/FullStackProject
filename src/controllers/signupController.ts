'use strict'

import * as express from "express";
const router = express.Router();
const userDB = require('../models/userDB');
const errCodes = require('../ProjectConstants');
let UserDataModel = require("../models/userDataModel");

router.use(function (request:express.Request,response:express.Response,next:express.NextFunction) {
    console.log("signup Request Recieved Time");
    next();
});

router.get("/",function (request:express.Request,response:express.Response) {
    if(request.session.username){
        userDB.GetUserDetails(request.session.username,(err,data) => {
            if(err == null){
                console.log("[loginController.ts] user session found redirecting to user-home");
                response.locals.userData = data;
                response.redirect('/user-home');
                return;
            }
            response.render("signupLogin" ,{
                signup : true
            })

        })
    }else{
        response.render("signupLogin" ,{
            signup : true
        })
    }

});

router.post("/validate",function (request:express.Request,response:express.Response,next:express.NextFunction) {
    try
    {
        var userDataModel = new UserDataModel(request.body.username, request.body.password, request.body.name, request.body.city);
        userDB.UserSignUp(userDataModel, (errStr: string, data: any) => {
            console.log("callback from sign up db got ", errStr);
            if (errStr == null)
            {
                request.session.username = userDataModel.username;
                response.render("userHome");
            }
            else if (errStr == errCodes.USER_ALREADY_PRESENT) {

                response.render("signupLogin", {
                    signup: true,
                    helpers: {
                        SignUpError: function () {
                            return "Username Already Exists Pls login or use a different email "
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
    catch(err)
    {
        response.status(500).send("User Input data not correct");
    }

});

module.exports = router;

