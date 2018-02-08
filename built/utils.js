"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const commonTypes = require("./commonTypes");
const projectConstants = require("./ProjectConstants");
function CheckTokenAuth(request, response, next) {
    try {
        let token = request.headers['x-access-token'];
        try {
            jwt.verify(token, projectConstants.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    console.log("[CheckAuthToken]:token verification failed ", err.stack);
                    let reply = ConstructMessage(projectConstants.SESSION_EXPIRED, {});
                    response.json(reply);
                }
                else {
                    console.log("[CheckAuthToken]:token verified successfully", decoded);
                    next();
                }
            });
        }
        catch (e) {
            let reply = ConstructMessage(projectConstants.SESSION_EXPIRED, {});
            response.json(reply);
        }
    }
    catch (e) {
        response.status(761).json({
            err: "Session Expired Login in Again"
        });
    }
}
exports.CheckTokenAuth = CheckTokenAuth;
function ConstructMessage(msgType, data) {
    let message = new commonTypes.ResponseMessage(msgType, data);
    return message;
}
exports.ConstructMessage = ConstructMessage;
function GetNewUserToken(username) {
    let token = jwt.sign({ username: username, iat: Date.now() }, projectConstants.JWT_SECRET_KEY, { expiresIn: "1d" });
    return token;
}
exports.GetNewUserToken = GetNewUserToken;
//# sourceMappingURL=utils.js.map