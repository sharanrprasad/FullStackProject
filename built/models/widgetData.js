"use strict";
class WidgetDataModel {
    FromJson(jsonObject) {
        this.id = jsonObject.id;
        this.name = jsonObject.name;
        this.description = jsonObject.description;
        this.className = jsonObject.className;
    }
}
module.exports = WidgetDataModel;
//# sourceMappingURL=widgetData.js.map