import * as express from "express";

import * as  jwt  from 'jsonwebtoken';
import * as commonTypes from './commonTypes';
import projectConstants = require('./ProjectConstants');

function CheckTokenAuth(request:express.Request,response:express.Response,next:express.NextFunction){
    try{

        let token:any = request.headers['x-access-token'];
        try {
        jwt.verify(token,projectConstants.JWT_SECRET_KEY,(err, decoded) =>{
            if(err){
                console.log("[CheckAuthToken]:token verification failed ",err.stack);
                let reply= ConstructMessage(projectConstants.SESSION_EXPIRED,{});
                response.json(reply);

            }else{
                console.log("[CheckAuthToken]:token verified successfully",decoded);
                next();
            }
        });

        }
        catch (e) {
            let reply= ConstructMessage(projectConstants.SESSION_EXPIRED,{});
            response.json(reply);
        }



    }
    catch (e){

        response.status(761).json({
            err:"Session Expired Login in Again"
        });
    }
}


function ConstructMessage(msgType:string,data:any):string{

   let message :commonTypes.ResponseMessage = new commonTypes.ResponseMessage(msgType,data);
   return message.ToJson();

}

function GetNewUserToken(username:string):string{
    let token = jwt.sign({username:username,iat:Date.now()},projectConstants.JWT_SECRET_KEY,{expiresIn:"1d"});
    return token;
}


export {CheckTokenAuth,ConstructMessage,GetNewUserToken};