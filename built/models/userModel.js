const mysqlDB = require('mysqlConnect');
exports.GetUserDetails = function (username, callback) {
    var queryString = "select * from FullStackProject.UserData where username =" + mysqlDB.escape(username) + "limit 1";
    mysqlDB.query(queryString, (err, rows) => {
        if (err)
            callback(err, null);
        else
            callback(null, rows);
    });
};
//# sourceMappingURL=userModel.js.map