import * as mysql from 'mysql';

let sqlurl = process.env.JAWSDB_URL || "mysql://root:sharan123@localhost/FullStackProject"

console.log(sqlurl);

//production
const con = mysql.createConnection(sqlurl);


con.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("Connection To Mysql DB Successfull!");
    }
});

let userCreationQuery = "create table if not exists UserData(" +
    "username varchar(30) not null," +
    "password varchar(30)," +
    "name varchar(20)," +
    "city varchar(15) ," +
    "isAdmin bool, " +
    "primary key(username)" +
    ")";


con.query(userCreationQuery, err => {
    if (err) {
        throw  err;
    }
    console.log("User table successfully created and running");
});


let widgetCreationQuery = "create table if not exists WidgetData(" +
    "id varchar(10) not null," +
    "name varchar(15)," +
    "description varchar(50)," +
    "className  varchar(30)," +
    "primary key(id)" +
    ")";

con.query(widgetCreationQuery, err => {
    if (err) {
        throw  err;
    }
    console.log("Widget table successfully created and running");
});


let userWidgetCreationQuery = "create table if not exists UserWidgetData(" +
    "id varchar(10) not null," +
    "username varchar(30)," +
    "primary key(id,username)," +
    "foreign key(id) references WidgetData(id) on delete cascade on update cascade," +
    "foreign key(username) references UserData(username) on delete cascade on update cascade" +
    ")";

con.query(userWidgetCreationQuery, err => {
    if (err) {
        throw  err;
    }
    console.log("UserWidget table successfully created and running");
});


//module.exports = con;
export = con;




