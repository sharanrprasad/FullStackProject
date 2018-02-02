'use strict';

import * as express from "express";
const app = require('./app');
const port:string = process.env.PORT ||  "3000";
import mysqlConnection = require("./models/mysqlConnect");
import * as userDB from './models/userDB';
import  restApiIndex = require('./controllers/restAPI/restAPIIndex');
import * as utils from  "./utils";
import apiIndex = require('./controllers/api/apiIndex');
import browserRequestIndex = require('./controllers/browserRequestHandler/browserRequestIndex')



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


app.use('/rest-api',restApiIndex);

app.use('/api',apiIndex);

app.use('/br',browserRequestIndex);

app.listen(port);





