import {select} from "../../../../Library/Preferences/IntelliJIdea2017.3/javascript/extLibs/global-types/node_modules/@types/async";

namespace  UserDB {

    const mysqlConn = require('./mysqlConnect');
    const errCodes = require('../ProjectConstants');
    const userDataModel = require('./userDataModel');

    exports = module.exports;

    function GetUserDetails(username: string, callback: (err: string, userData: UserDataModel) => void): void {
        let queryString = "select * from FullStackProject.UserData where username =" + mysqlConn.escape(username) + "limit 1";
        mysqlConn.query(queryString, (err, rows) => {
            if (err || rows.length == 0)
                callback(errCodes.USER_NOT_PRESENT, null);
            else {
                let userObj = new userDataModel();
                userObj.FromJson(rows[0]);
                callback(null, userObj);
            }
        })
    }


   function UserSignUp(userData: UserDataModel, callabck: (err: string, result: any) => void): void {
        if (userData == null) {
            console.log("[:UserSignUp] user data seems to be null ")
            callabck(errCodes.GENERIC_ERROR, null);
            return;
        }
        GetUserDetails(userData.username, (err, data) => {
            if (err == null) {
                callabck(errCodes.USER_ALREADY_PRESENT, null);
                return;
            }
            let queryString = "insert into FullStackProject.UserData set ?";
            mysqlConn.query(queryString, userData, function (err: Error, result: any): void {
                if (err == null)
                    callabck(null, result);
                else {
                    console.log(err.stack);
                    callabck(errCodes.GENERIC_ERROR, result);
                }

            });
        });

    }


    function MatchAndGetAllUserData(matchUsername:string,callback:(err:string,data:any) => void) : void {
            matchUsername = "%" + matchUsername + "%";
            let queryString = "select * from FullStackProject.UserData where username like  ?  or name like  ?  ";
            mysqlConn.query(queryString,[matchUsername,matchUsername],function (err: Error, rows: any[]): void {
                if (err == null)
                    callback(null, rows);
                else {
                    console.log(err.stack);
                    callback(errCodes.GENERIC_ERROR, rows);
                }

            });
    }

    function  DeleteUser(username:string,callback:(errStr:string,result:any[]) => void) :void {

        let queryString = " delete from FullStackProject.UserData where username = ?";
        mysqlConn.query(queryString,username,function (err: Error, rows: any[]): void {
                console.log(rows,err);
                if(err == null){
                    callback(null,rows);
                }else{
                    callback(errCodes.GENERIC_ERROR,null);
                }

        });

    }


    function  UpdateUserDetails(userData:UserDataModel,callback:(errStr:string,result:any[]) => void) :void {
        let  queryString = "update FullStackProject.UserData set ? where username = ? ";
        mysqlConn.query(queryString,[{name : userData.name,city : userData.city,password:userData.password },userData.username] ,function (err: Error, rows: any[]): void {
            console.log(rows);
            if(err == null){
                callback(null,rows);
            }else{
                callback(errCodes.GENERIC_ERROR,null);
            }

        });

    }



    exports.GetUserDetails = GetUserDetails;
    exports.UserSignUp = UserSignUp;
    exports.MatchAndGetAllUserData = MatchAndGetAllUserData;
    exports.DeleteUser = DeleteUser;
    exports.UpdateUserDetails = UpdateUserDetails;


}





