"use strict";
class ProjectConstants {
    constructor() {
        //errortypes
        this.GENERIC_ERROR = "50";
        this.USER_NOT_PRESENT = "51";
        this.INCORRECT_PASSWORD = "52";
        this.USER_ALREADY_PRESENT = "53";
        this.NO_PURCHASED_WIDGETS = "54";
        this.CART_EMPTY = "55";
        this.SESSION_EXPIRED = "56";
        this.SEARCH_NOT_FOUND = "57";
        //response types
        this.SUCCESS = "111";
        //project constants
        this.JWT_SECRET_KEY = "AABB987QWERTY5654";
    }
}
let projectConstants = new ProjectConstants();
module.exports = projectConstants;
//module.exports = projectConstants; 
//# sourceMappingURL=ProjectConstants.js.map