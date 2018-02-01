import * as express from "express";
const router = express.Router();
import errCodes = require('../../ProjectConstants');
import * as  userWidgetDB from '../../models/userWidgetDB';
import * as utils from  '../../utils'



router.post("/user-widgets",function (request:express.Request,response:express.Response){
    let username = request.body.username;
    console.log("[My AccountController : user-widgets] username requesting service is  " , username);
    userWidgetDB.GetUserPurchasedWidgets(username,(errStr:string,widgets:any[] ) => {
        console.log(widgets)
        if(errStr == null){
            let obj = {
                num : widgets.length,
                widgets : widgets //TODO changed name here from data to widgets pls check
            }
            response.json(utils.ConstructMessage(errCodes.SUCCESS,obj));

        }else{
            let obj = {
                num : 0,
                data : null
            }
            response.json(utils.ConstructMessage(errStr,obj));
        }

    });


});


export = router;