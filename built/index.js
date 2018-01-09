"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('./app');
const loginController = require("./controllers/loginController");
const signupController = require("./controllers/signupController");
const port = process.env.PORT || "3000";
const mysqlConnection = require("./models/mysqlConnect");
const userDB = require('./models/userDB');
const homePageController = require("./controllers/homePageController");
const myAccountController = require("./controllers/myAccountController");
const adminController = require("./controllers/adminController");
app.get("/", function (request, response) {
    if (request.session.username) {
        userDB.GetUserDetails(request.session.username, (err, data) => {
            if (err == null) {
                console.log("[index.ts] user session found redirecting to user-home");
                response.locals.userData = data;
                response.redirect('/user-home');
                return;
            }
            response.render('landingPage');
        });
    }
    else {
        console.log("[index.ts] user session not found launching landing page");
        response.render("landingPage");
    }
});
app.use('/sign-in', loginController);
app.use('/sign-up', signupController);
app.use('/user-home', homePageController);
app.use('/user-myaccount', myAccountController);
app.use('/admin', adminController);
app.listen(port);
//# sourceMappingURL=index.js.map