class UserData {
   public username :string
    public password : string
    public name : string
    public city :string
    public isAdmin : boolean

   public FromJson (jsonObject:any){
        this.username = jsonObject.username;
        this.password = jsonObject.password;
        this.name = jsonObject.name;
        this.city = jsonObject.city;
        this.isAdmin = jsonObject.isAdmin;
    }

    public constructor();
    public constructor(username:string,password:string,name:string,city:string);
    public constructor(username?:string,password?:string,name?:string,city?:string){
       this.username = username || "";
       this.password = password || "";
       this.name= name||"";
       this.city = city || "";
       this.isAdmin = false;
    }

}

export = UserData;


//module.exports = UserData;

