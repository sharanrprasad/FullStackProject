'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('./app');
const port = process.env.PORT || "3000";
const userDB = require("./models/userDB");
const restApiIndex = require("./controllers/restAPI/restAPIIndex");
const apiIndex = require("./controllers/api/apiIndex");
const browserRequestIndex = require("./controllers/browserRequestHandler/browserRequestIndex");
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
app.use('/rest-api', restApiIndex);
app.use('/api', apiIndex);
app.use('/br', browserRequestIndex);
app.listen(port);
//# sourceMappingURL=index.js.map