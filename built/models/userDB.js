"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlConn = require("./mysqlConnect");
const errCodes = require("../ProjectConstants");
const UserData = require("./userData");
//exports = module.exports;
function GetUserDetails(username, callback) {
    let queryString = "select * from UserData where username =" + mysqlConn.escape(username) + "limit 1";
    mysqlConn.query(queryString, (err, rows) => {
        if (err || rows.length == 0)
            callback(errCodes.USER_NOT_PRESENT, null);
        else {
            let userObj = new UserData();
            userObj.FromJson(rows[0]);
            callback(null, userObj);
        }
    });
}
exports.GetUserDetails = GetUserDetails;
function UserSignUp(userData, callabck) {
    if (userData == null) {
        console.log("[:UserSignUp] user data seems to be null ");
        callabck(errCodes.GENERIC_ERROR, null);
        return;
    }
    GetUserDetails(userData.username, (err, data) => {
        if (err == null) {
            callabck(errCodes.USER_ALREADY_PRESENT, null);
            return;
        }
        let queryString = "insert into UserData set ?";
        mysqlConn.query(queryString, userData, function (err, result) {
            if (err == null)
                callabck(null, result);
            else {
                console.log(err.stack);
                callabck(errCodes.GENERIC_ERROR, result);
            }
        });
    });
}
exports.UserSignUp = UserSignUp;
function MatchAndGetAllUserData(matchUsername, callback) {
    matchUsername = "%" + matchUsername + "%";
    let queryString = "select * from UserData where username like  ?  or name like  ?  ";
    mysqlConn.query(queryString, [matchUsername, matchUsername], function (err, rows) {
        if (err == null)
            callback(null, rows);
        else {
            console.log(err.stack);
            callback(errCodes.GENERIC_ERROR, rows);
        }
    });
}
exports.MatchAndGetAllUserData = MatchAndGetAllUserData;
function DeleteUser(username, callback) {
    let queryString = " delete from UserData where username = ?";
    mysqlConn.query(queryString, username, function (err, rows) {
        console.log(rows, err);
        if (err == null) {
            callback(null, rows);
        }
        else {
            callback(errCodes.GENERIC_ERROR, null);
        }
    });
}
exports.DeleteUser = DeleteUser;
function UpdateUserDetails(userData, callback) {
    let queryString = "update UserData set ? where username = ? ";
    mysqlConn.query(queryString, [{
            name: userData.name,
            city: userData.city,
            password: userData.password
        }, userData.username], function (err, rows) {
        console.log(rows);
        if (err == null) {
            callback(null, rows);
        }
        else {
            callback(errCodes.GENERIC_ERROR, null);
        }
    });
}
exports.UpdateUserDetails = UpdateUserDetails;
//# sourceMappingURL=userDB.js.map