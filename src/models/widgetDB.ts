namespace WidgetDB {

    const mysqlConn = require('./mysqlConnect');
    const errCodes = require('../ProjectConstants');

    exports = module.exports;

    function GetAllWidgetsData (callback: (err: string, data: any[]) => void): void {
        let queryString = "select * from WidgetData";
        mysqlConn.query(queryString, (err, rows) => {
            if (err)
                callback(errCodes.GENERIC_ERROR,null);
            else{
               callback(null,rows);
            }
        });
    }

    exports.GetAllWidgetsData = GetAllWidgetsData;



}