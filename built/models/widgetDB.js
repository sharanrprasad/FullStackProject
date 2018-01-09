var WidgetDB;
(function (WidgetDB) {
    const mysqlConn = require('./mysqlConnect');
    const errCodes = require('../ProjectConstants');
    exports = module.exports;
    function GetAllWidgetsData(callback) {
        let queryString = "select * from FullStackProject.WidgetData";
        mysqlConn.query(queryString, (err, rows) => {
            if (err)
                callback(errCodes.GENERIC_ERROR, null);
            else {
                callback(null, rows);
            }
        });
    }
    exports.GetAllWidgetsData = GetAllWidgetsData;
})(WidgetDB || (WidgetDB = {}));
//# sourceMappingURL=widgetDB.js.map