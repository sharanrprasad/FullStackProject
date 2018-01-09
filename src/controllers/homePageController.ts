import * as express from "express";
const router = express.Router();
const errCodes = require('../ProjectConstants');
let UserDataModel = require("../models/userDataModel");
const widgetDB = require('../models/widgetDB');
const userWidgetDB = require('../models/userWidgetDB');
const userDB = require('../models/userDB');
const bodyParser = require('body-parser');
const weather = require('weather-js');


let jsonParser = bodyParser.json();

router.get("/",function (request:express.Request,response:express.Response) {
    console.log("[HomePageController]User Home request recieved");
        var userData = response.locals.userData; //TODO: Watch out herre for errors
        if(userData == null && request.session.username == null){
            response.redirect("/");  //TODO test case this
        }else if(request.session.username){

            userDB.GetUserDetails(request.session.username,(err,data) => {
                if(err == null){
                    response.render("userHome");
                    return;
                }
                response.render('landingPage');
            })

        }
        else{
            response.render("userHome");
        }
});


router.get("/get-widgets", function (request:express.Request,response:express.Response) {

    widgetDB.GetAllWidgetsData((errStr:string,data:any[] ) => {
            if(errStr == null){
                        var jsonString = JSON.stringify(data);
                        response.setHeader('Content-Type', 'application/json');
                        response.send(jsonString);

            }else{
                response.status(500).send("User Input data not correct");
            }

    });


});


router.post("/buy-widget",jsonParser, function (request:express.Request,response:express.Response,next:express.NextFunction) {
    let username = request.session.username;
    let widgetID = request.body.id;
    if(username == null || widgetID == null){
            console.log("[HomePageController: username or widget id is null so redirecting back to user page]",username,widgetID);
            response.locals.errStr = errCodes.GENERIC_ERROR;
            response.redirect("../../user-myaccount");

    }else{
        console.log("[HomePageController:/Buy Widget username and id is",username,widgetID);
        next();
    }

},function (request:express.Request,response:express.Response) {
        let username = request.session.username;
        let widgetID = request.body.id;
        userWidgetDB.BuyWidget(username,widgetID,(errStr:string,data:any[]) :void =>{
                if(errStr != null){
                    response.locals.errStr = errStr;
                    response.locals.widgetID = widgetID;
                    console.log("[HomePageController: Success redirecting to user-myaccount page");
                    response.redirect("../../user-myaccount");
                }else{
                    response.redirect("../../user-myaccount");
                }
        });
});

router.get("/get-weather", function (request:express.Request,response:express.Response){
    console.log("[HomePageController] Get Waether called");
    if(request.session.username) {
        userDB.GetUserDetails(request.session.username, (err, data) => {
            weather.find({search: data.city, degreeType: 'C'}, function (err, result) {
                let jsonData = " ";
                if (err) {
                    console.log("[Error in getting weather]",err);
                } else {
                    jsonData = JSON.stringify(result, null, 2)
                }
                response.setHeader('Content-Type', 'application/json');
                response.send(jsonData);
            });
        });
    }else{
        response.status(500).send("Weather Cannot be displayed");
    }
});



router.get("/logout",function (request:express.Request,response:express.Response){
                request.session.destroy((err) =>{
                    response.redirect("/");
                })
});

module.exports = router;