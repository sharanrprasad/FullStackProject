"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlConn = require("./mysqlConnect");
const errCodes = require("../ProjectConstants");
function GetUserPurchasedWidgets(username, callback) {
    let queryString = "select * from WidgetData where id in ( select id from UserWidgetData where username =? ) ";
    mysqlConn.query(queryString, username, (err, rows) => {
        if (err || rows.length == 0) {
            callback(errCodes.NO_PURCHASED_WIDGETS, null);
        }
        else
            callback(null, rows);
    });
}
exports.GetUserPurchasedWidgets = GetUserPurchasedWidgets;
function BuyWidget(username, ids, callback) {
    let queryString = "insert into UserWidgetData values ?  ON DUPLICATE KEY UPDATE id = id ,username =username";
    let values = [];
    for (let i = 0; i < ids.length; i++) {
        values[i] = [ids[i], username];
    }
    mysqlConn.query(queryString, [values], function (err, result) {
        if (err) {
            console.log(err.name, err.message);
            callback(errCodes.GENERIC_ERROR, null);
        }
        else
            callback(null, result);
    });
}
exports.BuyWidget = BuyWidget;
function AddToCart(username, id, callback) {
    let queryString = "insert into UserCartData set ?  ON DUPLICATE KEY UPDATE id = id ,username =username;";
    let obj = {
        username: username,
        id: id
    };
    mysqlConn.query(queryString, obj, function (err, result) {
        if (err)
            callback(errCodes.GENERIC_ERROR, null);
        else
            callback(null, result);
    });
}
exports.AddToCart = AddToCart;
function GetUserCartItems(username, callback) {
    let queryString = "Select * from WidgetData,UserCartData where WidgetData.id = UserCartData.id and UserCartData.username = ? ";
    mysqlConn.query(queryString, username, function (err, result) {
        if (err)
            callback(errCodes.GENERIC_ERROR, null);
        else
            callback(null, result);
    });
}
exports.GetUserCartItems = GetUserCartItems;
function RemoveFromCart(username, id, callback) {
    let queryString = "Delete from UserCartData where id = ? and username = ? ";
    mysqlConn.query(queryString, [id, username], function (err, result) {
        if (err)
            callback(errCodes.GENERIC_ERROR, null);
        else
            callback(null, result);
    });
}
exports.RemoveFromCart = RemoveFromCart;
function RemoveFromCartMutiple(username, ids, callback) {
    let queryString = "Delete from UserCartData where username = ? and id in  (?) ";
    mysqlConn.query(queryString, [username, ids], function (err, result) {
        if (err) {
            console.log("[Error in RemoveCartMultiple] ", err.message);
            callback(errCodes.GENERIC_ERROR, null);
        }
        else
            callback(null, result);
    });
}
exports.RemoveFromCartMutiple = RemoveFromCartMutiple;
//# sourceMappingURL=userWidgetDB.js.map