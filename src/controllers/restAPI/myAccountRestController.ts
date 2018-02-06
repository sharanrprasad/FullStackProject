import * as express from "express";
const router = express.Router();
import errCodes = require('../../ProjectConstants');
import * as  userWidgetDB from '../../models/userWidgetDB';
import * as utils from  '../../utils'
import  * as userDB from '../../models/userDB'
import UserData = require('../../models/userData');



router.get("/user-widgets",function (request:express.Request,response:express.Response){
    let username:any = request.headers["x-user-name"];
    console.log("[My AccountControllerRest  : user-widgets] username requesting service is  " , username);
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


router.get("/user-data",function (request:express.Request,response:express.Response){

    try {
        let username: any = request.headers['x-user-name'];
        if (username == null) {
            response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
            return;
        }
        userDB.GetUserDetails(username, (errStr: string, userData: UserData) => {
            if (errStr == null) {
                errStr = errCodes.SUCCESS;
            }
            response.json(utils.ConstructMessage(errStr, userData));

        });
    }catch (err){
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR, {}));
    }


});


export = router;