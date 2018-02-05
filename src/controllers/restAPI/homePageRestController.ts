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

router.get("/get-widgets-user", function (request:express.Request,response:express.Response) {

     let username:any = request.headers["x-user-name"];
        if(username == null){
            response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR,{}));
            return;
        }
        try {

            widgetDB.GetAllWidgetsWithBrought(username, (errStr: string, data: any[]) => {
                if (errStr == null) {
                    errStr = errCodes.SUCCESS;
                }
                response.json(utils.ConstructMessage(errStr, {widgets: data}));
            });
        }
        catch(err)
        {
            response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR,{}));

        }


});





router.post("/buy-widget",function (request:express.Request,response:express.Response,next:express.NextFunction) {
    let username:any = request.headers["x-user-name"];
    let widgetIDs:string[]= request.body.ids;
    if(username == null || widgetIDs == null){
        console.log("[HomePageController: username or widget id is null]",username,widgetIDs);
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR,{}));
    }else if(widgetIDs.length == 0){
        response.json(utils.ConstructMessage(errCodes.CART_EMPTY,{}));
    }
    else{
        console.log("[HomePageController:/Buy Widget username and ids is",username,widgetIDs);
        next();
    }

},function (request:express.Request,response:express.Response) {
    let username = request.body.username;
    let widgetIDs :string []= request.body.ids;
    userWidgetDB.BuyWidget(username,widgetIDs,(errStr:string,result:any) :void =>{
        if(errStr == null){
            errStr = errCodes.SUCCESS;
        } //TODO;Insert if not present only
        response.json(ConstructMessage(errStr,{result:result}));

    });
});


router.post("/add-to-cart",function (request:express.Request,response:express.Response,next){
    let widgetID = request.body.widgetId;
    let username:any = request.headers["x-user-name"];
    if(username == null || widgetID == null){
        console.log("[HomePageController Add to cart : username or widget id is null]",username,widgetID);
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR,{}));
        return;
    }
    userWidgetDB.AddToCart(username,widgetID,(errStr:string,result:any):void =>{
        if(errStr == null)
            errStr = errCodes.SUCCESS;

        response.json(ConstructMessage(errStr,{result:result}));
    });

});

router.get("/get-cart",function(request:express.Request,response:express.Response,next) {
    let username = request.headers['x-user-name'];
    if(Array.isArray(username)){
        username = username[0];
    }
    if(username == null){
        console.log("[HomePageController GetCart : username  is null]");
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR,{}));
        return;
    }
    userWidgetDB.GetUserCartItems(username,(errStr:string,result:any):void =>{
        if(errStr == null)
            errStr = errCodes.SUCCESS;

        response.json(ConstructMessage(errStr,{widgets:result}));
    });
});


router.post("/remove-from-cart",function(request:express.Request,response:express.Response,next) {

    try {
        let username: any = request.headers["x-user-name"];
        if (Array.isArray(username)) {
            username = username[0];
        }
        let id: string = request.body.widgetId;
        userWidgetDB.RemoveFromCart(username,id,(errStr, data) => {
            if(errStr == null)
                errStr = errCodes.SUCCESS;

            response.json(ConstructMessage(errStr,data));
        });

    }

    catch (err) {

        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR,{}));
    }




});




router.get("/get-weather", function (request:express.Request,response:express.Response){
    console.log("[HomePageControllerRest API] Get Waether called");
    try {
        let username : any = request.headers["x-user-name"];
        userDB.GetUserDetails(username, (err, data) => {
            weather.find({search: data.city, degreeType: 'C'}, function (err, result) {
                if (err) {
                    console.log("[Error in getting weather]",err);
                    response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR,{}));
                } else {
                    response.json(utils.ConstructMessage(errCodes.SUCCESS,data));
                }
            });
        });
    }catch (e){

        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR,{}));
    }
});


