
import mysqlConn = require('./mysqlConnect');
import errCodes = require('../ProjectConstants');
import UserData = require('./userData');

//exports = module.exports;

function GetUserDetails(username: string, callback: (err: string, userData: UserData) => void): void {
    let queryString = "select * from UserData where username =" + mysqlConn.escape(username) + "limit 1";
    mysqlConn.query(queryString, (err, rows) => {
        if (err || rows.length == 0)
            callback(errCodes.USER_NOT_PRESENT, null);
        else {
            let userObj = new UserData();
            userObj.FromJson(rows[0]);
            callback(null, userObj);
        }
    })
}


function UserSignUp(userData: UserData, callabck: (err: string, result: any) => void): void {
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
        let queryString = "insert into UserData set ?";
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


function MatchAndGetAllUserData(matchUsername: string, callback: (err: string, data: any) => void): void {
    matchUsername = "%" + matchUsername + "%";
    let queryString = "select * from UserData where username like  ?  or name like  ?  ";
    mysqlConn.query(queryString, [matchUsername, matchUsername], function (err: Error, rows: any[]): void {
        if (err == null)
            callback(null, rows);
        else {
            console.log(err.stack);
            callback(errCodes.GENERIC_ERROR, rows);
        }

    });
}

function DeleteUser(username: string, callback: (errStr: string, result: any[]) => void): void {

    let queryString = " delete from UserData where username = ?";
    mysqlConn.query(queryString, username, function (err: Error, rows: any[]): void {
        console.log(rows, err);
        if (err == null) {
            callback(null, rows);
        } else {
            callback(errCodes.GENERIC_ERROR, null);
        }

    });

}


function UpdateUserDetails(userData: UserData, callback: (errStr: string, result: any[]) => void): void {
    let queryString = "update UserData set ? where username = ? ";
    mysqlConn.query(queryString, [{
        name: userData.name,
        city: userData.city,
        password: userData.password
    }, userData.username], function (err: Error, rows: any[]): void {
        console.log(rows);
        if (err == null) {
            callback(null, rows);
        } else {
            callback(errCodes.GENERIC_ERROR, null);
        }

    });

}

export {GetUserDetails,UserSignUp,MatchAndGetAllUserData,DeleteUser,UpdateUserDetails}









