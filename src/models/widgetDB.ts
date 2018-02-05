import  mysqlConn = require('./mysqlConnect');
import errCodes = require('../ProjectConstants');



export function GetAllWidgetsData(callback: (err: string, data: any[]) => void): void {
    let queryString = "select * from WidgetData";
    mysqlConn.query(queryString, (err, rows) => {
        if (err)
            callback(errCodes.GENERIC_ERROR, null);
        else {
            callback(null, rows);
        }
    });
}

export function  GetAllWidgetsWithBrought (username:string, callback:(err: string, data: any[]) => void): void {

    let querystring = " select WidgetData.id,name,description,className,username from WidgetData  left   join (select id,username from UserWidgetData  where " +
        "UserWidgetData.username = ? ) as userbroughtWidgets  on " +
        "WidgetData.id = userbroughtWidgets.id";

    mysqlConn.query(querystring,username,(err,rows) => {
        if(err)
            callback(errCodes.GENERIC_ERROR, null);
        else{
            callback(null, rows);
        }

    })

}




