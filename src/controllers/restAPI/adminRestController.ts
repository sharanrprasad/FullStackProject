import * as express from "express";
const bodyParser = require('body-parser');
import * as userDB from '../../models/userDB';
import UserData = require('../../models/userData');
import * as utils from '../../utils';
import errorCodes = require('../../ProjectConstants')


const router = express.Router();


router.post("/validate",function (request:express.Request, response:express.Response) {
    console.log("[RestAdminController: Validate Admin Login] request recieved");
    try{
        let username = request.body.username;
        let password = request.body.password;
        let replyMessage:string = '';
        if(username != "admin@admin.com"){

            replyMessage = utils.ConstructMessage(errorCodes.USER_NOT_PRESENT,{});
            response.json(replyMessage);
        }
        else if(password != "admin@123") {

            replyMessage= utils.ConstructMessage(errorCodes.INCORRECT_PASSWORD,{});
            response.json(replyMessage);

        }
        else {
           let token = utils.GetNewUserToken(username);
            replyMessage= utils.ConstructMessage(errorCodes.SUCCESS,{token:token});
            response.json(replyMessage);
        }


    }catch(err){

        let replyMessage:string = utils.ConstructMessage(errorCodes.USER_NOT_PRESENT,{});
        response.json(replyMessage);
    }


});

router.post("/get-user",function (request:express.Request,response:express.Response) {
    try {
        console.log("[AdminControllerRest: Get - Users] request recieved",request.body.searchname);
        let searchUsername = request.body.searchname || "";
        userDB.MatchAndGetAllUserData(searchUsername, (err, result) => {
            if(err == null)
                err = errorCodes.SUCCESS;
            let reply:string = utils.ConstructMessage(err,{users:result});
           response.json(reply);
        });
    }catch (err){
        console.log(err.stack);
        var arr= [];
        response.json(utils.ConstructMessage(errorCodes.GENERIC_ERROR,{users:arr}));
    }

})



router.post("/update-user",function (request:express.Request,response:express.Response) {
    try{
        console.log("[AdminController: Update - Users] request recieved",request.body.name);
        var userDataModel = new UserData(request.body.username, request.body.password, request.body.name, request.body.city);
        userDB.UpdateUserDetails(userDataModel, (errStr: string, data: any) => {
            if(errStr == null) {
                errStr = errorCodes.SUCCESS;
            }
                let reply:string = utils.ConstructMessage(errStr,data);
                response.json(reply);

        });

    }catch (err){
        console.log("[Error Admin Update User Function] ",err.stack);
        var arr= [];
        response.json(utils.ConstructMessage(errorCodes.GENERIC_ERROR,arr));
    }

})


router.post("/delete-user",function (request:express.Request,response:express.Response) {

    let username = request.body.username;
    console.log("[AdminController: User Deletion request recieved for]",username);
    try{
        userDB.DeleteUser(username,(err,result) => {
            if(err == null) {
                err = errorCodes.SUCCESS;
            }
            let reply:string = utils.ConstructMessage(err,result);
            response.json(reply);

        });
    }
    catch(err){
        var emptyObject= {};
        response.json(utils.ConstructMessage(errorCodes.GENERIC_ERROR,emptyObject));
    }
});


export  = router;
