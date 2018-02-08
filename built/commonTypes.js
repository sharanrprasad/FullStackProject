"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseMessage {
    constructor(message, data) {
        this.message = message || '';
        this.data = data || {};
    }
    ToJson() {
        return JSON.stringify(this);
    }
}
exports.ResponseMessage = ResponseMessage;
//# sourceMappingURL=commonTypes.js.map