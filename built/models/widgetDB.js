"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlConn = require("./mysqlConnect");
const errCodes = require("../ProjectConstants");
function GetAllWidgetsData(callback) {
    let queryString = "select * from WidgetData";
    mysqlConn.query(queryString, (err, rows) => {
        if (err)
            callback(errCodes.GENERIC_ERROR, null);
        else {
            callback(null, rows);
        }
    });
}
exports.GetAllWidgetsData = GetAllWidgetsData;
function GetAllWidgetsWithBrought(username, callback) {
    let querystring = " select WidgetData.id,name,description,className,username from WidgetData  left   join (select id,username from UserWidgetData  where " +
        "UserWidgetData.username = ? ) as userbroughtWidgets  on " +
        "WidgetData.id = userbroughtWidgets.id";
    mysqlConn.query(querystring, username, (err, rows) => {
        if (err)
            callback(errCodes.GENERIC_ERROR, null);
        else {
            callback(null, rows);
        }
    });
}
exports.GetAllWidgetsWithBrought = GetAllWidgetsWithBrought;
function SearchWidgetByName(searchname, username, callback) {
    searchname = "%" + searchname + "%";
    let queryString = " select WidgetData.id,name,description,className,username from WidgetData  left   join (select id,username from UserWidgetData  where " +
        "UserWidgetData.username = ? ) as userbroughtWidgets  on " +
        "WidgetData.id = userbroughtWidgets.id where name like  ? ";
    mysqlConn.query(queryString, [username, searchname], function (err, rows) {
        if (err == null)
            callback(null, rows);
        else {
            console.log(err.stack);
            callback(errCodes.GENERIC_ERROR, rows);
        }
    });
}
exports.SearchWidgetByName = SearchWidgetByName;
//# sourceMappingURL=widgetDB.js.map