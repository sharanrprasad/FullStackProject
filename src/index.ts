'use strict';

import * as express from "express";
const app = require('./app');
import loginController = require("./controllers/loginController");
import signupController = require("./controllers/signupController");
const port:string = process.env.PORT ||  "3000";
import mysqlConnection = require("./models/mysqlConnect");
import * as userDB from './models/userDB';
import homePageController = require("./controllers/homePageController");
import myAccountController = require("./controllers/myAccountController");
import adminController = require("./controllers/adminController");
import  restApiIndex = require('./controllers/restAPI/restAPIIndex');
import * as utils from  "./utils";



app.get("/",function (request:express.Request,response:express.Response) {

    if(request.session.username){
        userDB.GetUserDetails(request.session.username,(err,data) => {
            if(err == null){
                console.log("[index.ts] user session found redirecting to user-home");
                response.locals.userData = data;
                response.redirect('/user-home');
                return;
            }
            response.render('landingPage');
        })
    }else {
        console.log("[index.ts] user session not found launching landing page");
        response.render("landingPage");
    }
});

app.use('/sign-in',loginController);

app.use('/sign-up',signupController);

app.use('/user-home',homePageController);

app.use('/user-myaccount',myAccountController);

app.use('/admin',adminController);

app.use('/api',restApiIndex);

app.listen(port);





