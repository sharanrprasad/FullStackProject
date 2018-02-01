class WidgetDataModel {
    id : string
    name :string
    description : string
    className :string

    public FromJson(jsonObject:any){
        this.id = jsonObject.id;
        this.name = jsonObject.name;
        this.description = jsonObject.description;
        this.className = jsonObject.className;
    }

}

//module.exports = WidgetDataModel;
export = WidgetDataModel;
