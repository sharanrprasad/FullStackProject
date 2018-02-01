import mysqlConn = require('./mysqlConnect');
import errCodes = require('../ProjectConstants');

//exports = module.exports;

function GetUserPurchasedWidgets(username: string, callback: (err: string, data: any[]) => void) {


    let queryString = "select * from WidgetData where id in ( select id from UserWidgetData where username =? ) ";

    mysqlConn.query(queryString, username, (err, rows) => {
            if (err || rows.length == 0) {
                callback(errCodes.NO_PURCHASED_WIDGETS, null);
            }
            else
                callback(null, rows);

        }
    );
}


function BuyWidget(username: string, id: string, callback: (err: string, data: any) => void) {

    let queryString = "insert into UserWidgetData set ? ";
    let obj = {
        username: username,
        id: id
    }
    mysqlConn.query(queryString, obj, function (err: Error, result: any,) {
        if (err)
            callback(errCodes.GENERIC_ERROR, null);
        else
            callback(null, result);

    })


}


// exports.GetUserPurchasedWidgets = GetUserPurchasedWidgets;
// exports.BuyWidget = BuyWidget;
export {GetUserPurchasedWidgets,BuyWidget};

