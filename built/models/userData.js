"use strict";
class UserData {
    FromJson(jsonObject) {
        this.username = jsonObject.username;
        this.password = jsonObject.password;
        this.name = jsonObject.name;
        this.city = jsonObject.city;
        this.isAdmin = jsonObject.isAdmin;
    }
    constructor(username, password, name, city) {
        this.username = username || "";
        this.password = password || "";
        this.name = name || "";
        this.city = city || "";
        this.isAdmin = false;
    }
}
module.exports = UserData;
//module.exports = UserData;
//# sourceMappingURL=userData.js.map