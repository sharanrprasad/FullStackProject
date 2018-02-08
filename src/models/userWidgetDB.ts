import mysqlConn = require('./mysqlConnect');
import errCodes = require('../ProjectConstants');

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


function BuyWidget(username: string, ids: string[], callback: (err: string, data: any) => void) {

    let queryString = "insert into UserWidgetData values ?  ON DUPLICATE KEY UPDATE id = id ,username =username";
    let values:any = [];
    for(let i =0; i<ids.length; i++){
        values[i] = [ids[i],username];
    }
    mysqlConn.query(queryString, [values], function (err: Error, result: any,) {
        if (err) {
            console.log(err.name,err.message);
            callback(errCodes.GENERIC_ERROR, null);
        }
        else
            callback(null, result);

    })


}


function  AddToCart(username:string,id: string, callback: (err: string, data: any) => void) {

    let queryString = "insert into UserCartData set ?  ON DUPLICATE KEY UPDATE id = id ,username =username;";
    let obj = {
        username:username,
        id:id
    }

    mysqlConn.query(queryString,obj, function (err: Error, result: any) {
        if (err)
            callback(errCodes.GENERIC_ERROR, null);
        else
            callback(null, result);

    })
}

function  GetUserCartItems(username:string,callback:(err: string, data: any) => void){

    let queryString = "Select * from WidgetData,UserCartData where WidgetData.id = UserCartData.id and UserCartData.username = ? ";
    mysqlConn.query(queryString,username,function (err: Error, result: any) {
        if (err)
            callback(errCodes.GENERIC_ERROR, null);
        else
            callback(null, result);

    })
}

function  RemoveFromCart(username:string,id:string,callback:(err: string, data: any) => void){
    let queryString = "Delete from UserCartData where id = ? and username = ? ";
    mysqlConn.query(queryString,[id,username],function (err: Error, result: any) {
        if (err)
            callback(errCodes.GENERIC_ERROR, null);
        else
            callback(null, result);

    })
}

function  RemoveFromCartMutiple(username:string,ids:string[],callback:(err:string,data:any) => void ){

    let queryString = "Delete from UserCartData where username = ? and id in  (?) ";
    mysqlConn.query(queryString, [username,ids], function (err: Error, result: any,) {
        if (err) {
            console.log("[Error in RemoveCartMultiple] ", err.message);
            callback(errCodes.GENERIC_ERROR, null);
        }
        else
            callback(null, result);

    })


}


export {GetUserPurchasedWidgets,BuyWidget,AddToCart,GetUserCartItems,RemoveFromCart,RemoveFromCartMutiple};

