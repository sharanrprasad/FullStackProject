const mysql = require('mysql');


//localOnly
//  var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "sharan123",
//      database : "FullStackProject"
// });

 //production
var con = mysql.createConnection(process.env.JAWSDB_URL);



con.connect(function(err) {
    if (err) {
        throw err;
    }else {
        console.log("Connection To Mysql DB Successfull!");
    }
});

var userCreationQuery = "create table if not exists UserData(" +
    "username varchar(30) not null," +
    "password varchar(30)," +
    "name varchar(20)," +
    "city varchar(15) ," +
    "isAdmin bool, " +
    "primary key(username)" +
    ")";



con.query(userCreationQuery,err => {
    if(err) {
        throw  err;
    }
    console.log("User table successfully created and running");
});


var widgetCreationQuery = "create table if not exists WidgetData("+
    "id varchar(10) not null," +
    "name varchar(15),"+
    "description varchar(50)," +
    "className  varchar(30),"+
    "primary key(id)" +
    ")";

con.query(widgetCreationQuery,err => {
    if(err) {
        throw  err;
    }
    console.log("Widget table successfully created and running");
});



var userWidgetCreationQuery = "create table if not exists UserWidgetData(" +
    "id varchar(10) not null,"+
    "username varchar(30),"+
    "primary key(id,username),"+
    "foreign key(id) references WidgetData(id) on delete cascade on update cascade,"+
    "foreign key(username) references UserData(username) on delete cascade on update cascade"+
    ")";

con.query(userWidgetCreationQuery,err => {
    if(err) {
        throw  err;
    }
    console.log("UserWidget table successfully created and running");
});


module.exports  = con;


