import * as express from "express";
import LoginData = require('../../models/loginData');
import * as userDB from '../../models/userDB';;
const errCodes = require('../../ProjectConstants');
import * as utils from  '../../utils'
import * as commonTypes from "../../commonTypes";

const router = express.Router();
export  = router;


router.use(function (request:express.Request,response:express.Response,next:express.NextFunction) {
    console.log("[RestLoginController:]Home");
    next();
});

router.post("/validate",function (request:express.Request,response:express.Response){
    try {
        var loginData = new LoginData(request.body.username, request.body.password);
        console.log("[LoginController]: validate request recieved for username and password ", loginData.username,loginData.password);
        userDB.GetUserDetails(loginData.username, (err,userDataModel) => {
            if(err != null){
                response.json(utils.ConstructMessage(err,{userdata:null}));
                return;
            }else if(loginData.password != userDataModel.password){
                response.json( utils.ConstructMessage(errCodes.INCORRECT_PASSWORD,{userdata:null}));
                return;

            }
            else{
                let token = utils.GetNewUserToken(userDataModel.username);
                response.json(utils.ConstructMessage(errCodes.SUCCESS,{userdata:userDataModel,token:token}));
            }
        } );
    }catch(err){
        response.json( utils.ConstructMessage(errCodes.GENERIC_ERROR,{userdata:null}));
        return;
    }
});


