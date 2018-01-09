import * as express from "express";

const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');


//hbs engine
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        LoginError : function () { return ''; },
        SignUpError : function () {
            return "";
        },
        MyAccountError : function () {
            return "";
        },
        UserName : function () {
            return "";
        },
        AdminLoginError : function () {
            return "";
        }
    }
}));

app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '../public')));

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cookie and sessions
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));


app.use((err, request, response, next) => {
    // log the error, for now just console.log
    console.log("Error" ,err.stack);
    response.status(500).send('Something broke!');
});

module.exports = app;






