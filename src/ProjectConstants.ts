class  ProjectConstants{

    //errortypes
    public GENERIC_ERROR :string = "50";
    public USER_NOT_PRESENT :string = "51";
    public INCORRECT_PASSWORD :string = "52";
    public USER_ALREADY_PRESENT :string = "53";
    public NO_PURCHASED_WIDGETS : string = "54";
    public CART_EMPTY = "55";
    public SESSION_EXPIRED :string = "56";
    public SEARCH_NOT_FOUND :string = "57";



    //response types
    public SUCCESS :string = "111";


    //project constants
    public JWT_SECRET_KEY:string = "AABB987QWERTY5654";

}

let projectConstants = new ProjectConstants();

export = projectConstants;

//module.exports = projectConstants;