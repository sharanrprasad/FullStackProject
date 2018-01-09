import * as express from "express";
const router = express.Router();
const LoginDataModel = require('../models/loginDataModel');
const userDB = require('../models/userDB');
const errCodes = require('../ProjectConstants');


router.use(function (request:express.Request,response:express.Response,next:express.NextFunction) {
    console.log("[LoginController:]Home");
    next();
});

router.get("/",function (request:express.Request,response:express.Response) {
    response.render("signupLogin" ,{
        login : true
    })
});

router.post("/validate",function (request:express.Request,response:express.Response){
     try {
          var loginData = new LoginDataModel(request.body.username, request.body.password);
         console.log("[LoginController]: validate request recieved for username and password ", loginData.username,loginData.password);
         userDB.GetUserDetails(loginData.username, (err,userDataModel) => {
                       if(err == errCodes.USER_NOT_PRESENT  ){
                           response.render("signupLogin" ,{
                               login : true,
                               helpers : {
                                   LoginError: function () { return 'Email Address not registered Pls Sign Up'; }
                               }
                           })
                           return;
                       }else if(loginData.password != userDataModel.password){

                           response.render("signupLogin" ,{
                               login : true,
                               helpers : {
                                   LoginError: function () { return 'Incorrect Password Pls Try Again'; }
                               }
                           })
                           return;

                       }
                       else{
                            request.session.username = loginData.username;
                            response.render("userHome");
                       }
          } );
     }catch(err){
         response.redirect("../");

     }
});

module.exports = router;

