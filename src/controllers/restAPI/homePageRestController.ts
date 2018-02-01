import * as express from "express";
import errCodes = require('../../ProjectConstants');
import UserData = require("../../models/userData");
import * as widgetDB from '../../models/widgetDB';
import * as  userWidgetDB from '../../models/userWidgetDB';
import * as userDB from '../../models/userDB';
import * as utils from '../../utils';
import {ConstructMessage} from "../../utils";
const weather = require('weather-js');


const router = express.Router();

export =  router;

router.get("/get-widgets", function (request:express.Request,response:express.Response) {

    widgetDB.GetAllWidgetsData((errStr:string,data:any[] ) => {
        if(errStr == null) {
            errStr = errCodes.SUCCESS;
        }

        response.json(utils.ConstructMessage(errStr,{widgets:data}));

    });
});


router.post("/buy-widget",function (request:express.Request,response:express.Response,next:express.NextFunction) {
    let username = request.body.username;
    let widgetID = request.body.id;
    if(username == null || widgetID == null){
        console.log("[HomePageController: username or widget id is null]",username,widgetID);
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR,{}));


    }else{
        console.log("[HomePageController:/Buy Widget username and id is",username,widgetID);
        next();
    }

},function (request:express.Request,response:express.Response) {
    let username = request.body.username;
    let widgetID = request.body.id;
    userWidgetDB.BuyWidget(username,widgetID,(errStr:string,result:any) :void =>{
        if(errStr == null){
            errStr = errCodes.SUCCESS;
        } //TODO;Insert if not present only
        response.json(ConstructMessage(errStr,{result:result}));

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


