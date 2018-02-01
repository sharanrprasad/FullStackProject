export class ResponseMessage{
    public message:string
    public data:any

    constructor(message:string,data:any){
        this.message = message || '';
        this.data = data || {};
    }

    public ToJson():string{
      return  JSON.stringify(this);

    }

}