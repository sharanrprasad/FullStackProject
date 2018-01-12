import * as express from "express";
const router = express.Router();
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let userDB = require('../models/userDB');
const UserDataModel = require('../models/userDataModel')

router.get("/",function (request:express.Request,response:express.Response){
         console.log("[AdminController:] Home Page request recieved ");
         try{
             if(request.session.adminname && request.session.adminname == "admin@admin.com"){

                 response.render("adminHome");

             }else{
                 response.render('adminLogin');
             }
         }catch (err){
             response.render('adminLogin');
         }
});

router.get("/logout",function (request:express.Request,response:express.Response){
    request.session.destroy((err) =>{
        response.redirect("/");
    });
})



router.get("/validate",function (request:express.Request,response:express.Response){
    console.log("[AdminController:] Home Page request recieved ");
    response.redirect("/admin");

});


router.post("/validate",function (request:express.Request,response:express.Response) {
    console.log("[AdminController: Validate Admin Login] request recieved");
    try{
            let username = request.body.username;
            let password = request.body.password;

            if(username != "admin@admin.com"){
                response.render("adminLogin",{
                    helpers:{
                        AdminLoginError: function () {
                            return "username not correct please try again";
                        }
                    }
                });
            }else if(password != "admin@123"){
                response.render("adminLogin",{
                    helpers:{
                        AdminLoginError: function () {
                            return "password not correct please try again";
                        }
                    }
                })
            }else{
                request.session.adminname = username;
                response.render("adminHome");

            }


        }catch(err){

            response.redirect("/admin")
        }


})


router.post("/get-user",jsonParser,function (request:express.Request,response:express.Response) {
    try {
        console.log("[AdminController: Get - Users] request recieved",request.body.searchname);

        let searchUsername = request.body.searchname;
        userDB.MatchAndGetAllUserData(searchUsername, (err, result) => {
            console.log(result);
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(result));

        });
    }catch (err){
        console.log(err.stack);
        var arr= [];
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify(arr));
    }

})



router.post("/update-user",jsonParser,function (request:express.Request,response:express.Response) {
    try{
        console.log("[AdminController: Update - Users] request recieved",request.body.name);
        var userDataModel = new UserDataModel(request.body.username, request.body.password, request.body.name, request.body.city);
        userDB.UpdateUserDetails(userDataModel, (errStr: string, data: any) => {
            console.log(data);
            response.setHeader('Content-Type', 'application/json');
            response.sendStatus(200);
        });

    }catch (err){
        console.log(err.stack);
        var arr= [];
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify(arr));
    }


})


router.post("/delete-user",function (request:express.Request,response:express.Response) {

        let username = request.body.username;
        console.log("[AdminController: User Deletion request recieved for]",username);
        try{
            userDB.DeleteUser(username,(err,result) => {
                response.sendStatus(200);
            });
        }catch(err){
               response.send("error");
        }
})


module .exports = router;