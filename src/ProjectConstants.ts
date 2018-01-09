class  ProjectConstants{
    public GENERIC_ERROR :string = "50";
    public USER_NOT_PRESENT :string = "51";
    public INCORRECT_PASSWORD :string = "52";
    public USER_ALREADY_PRESENT :string = "53";
    public NO_PURCHASED_WIDGETS : string = "54";



}

let projectConstants = new ProjectConstants();

module.exports = projectConstants;