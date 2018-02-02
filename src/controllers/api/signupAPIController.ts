import LoginData = require('../../models/loginData');
import * as userDB from '../../models/userDB';;
const errCodes = require('../../ProjectConstants');
import * as utils from  '../../utils'
const UserData = require('../../models/userData')
import * as express from "express";

const router = express.Router();
export  = router;


router.post("/validate",function (request:express.Request,response:express.Response,next:express.NextFunction) {
    try
    {
        var userDataModel = new UserData(request.body.username, request.body.password, request.body.name, request.body.city);
        userDB.UserSignUp(userDataModel, (errStr: string, data: any) => {
            console.log("callback from sign up db got ", errStr);
            if (errStr == null)
            {
                let token= utils.GetNewUserToken(userDataModel.username);
                response.json(utils.ConstructMessage(errCodes.SUCCESS,{userdata:userDataModel,token:token}));
                return;
            }
            else{
                response.json(utils.ConstructMessage(errStr,{userdata:null,token:null}));
                return;
            }
        });

    }
    catch(err)
    {
        response.json(utils.ConstructMessage(errCodes.GENERIC_ERROR,{userdata:null,token:null}));
        return;
    }

});


