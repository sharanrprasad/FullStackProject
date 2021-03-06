var endurl = "https://safe-shore-55413.herokuapp.com";

//var endurl = "http://127.0.0.1:3000";


$(function () {

    console.log("Inside Admin Home Handler JS");

    // $("#searchuser").validate({
    //     rules: {
    //         searchname: {
    //             required: true,
    //
    //         }
    //     },
    //         messages: {
    //             searchname:"All Users Data will be displayed"
    //         },
    //
    //     submitHandler: function (form) {
    //         console.log("Success in validating form submit");
    //         return false;
    //
    //     }
    // });


    $("#searchuser").click(function () {
        console.log("on search click called");
       // event.preventDefault();
       // event.stopImmediatePropagation();
        let nameval = $('#searchuserinput').val();
        let data = {
            searchname : nameval
        }
        console.log("data sending to server",data);

        $.post(endurl + "/br/admin/get-user",data,function (result) {
            console.log("[AdminHomeHandler.JS] got the following result from server ", result);
            $("#searchresult").empty();
            $("#main-container").append("<div class=\"container\" id=\"searchresult\"></div>");
            if(result == null || result.length == 0){
                $("#searchresult").append("<p> No User Found <i class=\"fa fa-thumbs-down\" aria-hidden=\"true\"></i></p>");

            }else{

                result.forEach((row,i) => {

                    let htmlString = "<div class=\"container  user-layout\" name=\"searchresult\">\n <div class=\"row\">\n <div class=\"col-md-4\">\n" +
                        "            <div class=\"form_main\">\n <h4 class=\"heading\"> " +
                        row.username+ "<span></span></h4>\n <div class=\"form\">\n <form action=\"#\" method=\"post\" name=\"userformy\">\n" +
                        "<label for=\"name\" class=\"col-md-3 control-label\">Name</label>"+
                        "<input type=\"text\" required=\"\"  value=\""+ row.name + "\"name=\"name\" class=\"txt\">\n" +
                        "<label for=\"password\" class=\"col-md-3 control-label\">Password</label>"+
                        " <input type=\"text\" required=\"\"  value=\""+ row.password + "\"name=\"password\" class=\"txt\">\n" +
                        "<label for=\"city\" class=\"col-md-3 control-label\">City</label>"+
                        " <input type=\"text\" required=\"\"  value=\""+ row.city + " \"name=\"city\" class=\"txt\">\n" +
                        "<input type=\"text\"  value=\""+ row.username + " \"name=\"username\" class=\"txt\" hidden>\n" +
                        " <button type=\"submit\" class=\"btn\"><i class=\"fa fa-pencil-square-o\" style=\"font-size: small\"></i>Edit</button>\n" +
                        " </form>\n </div>\n <div class=\"container \">\n" +
                        " <a class=\"btn btn-primary\" style=\"color:firebrick\" onclick = \"OnDeleteUser(this)\" id=\"" + row.username + "\">Delete User\n" +
                        "                        <i class = \"fa fa-user\" style=\"font-size: medium\"></i></a>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</div>"


                    $("#searchresult").append(htmlString);


                })

            }


            $('form[name =userformy]').validate({
                rules: {
                    password: {
                        required: true,
                        minlength: 5
                    },
                    name: {
                        required: true
                    },
                    city: {
                        required: true
                    }
                },
                messages: {
                    password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    name: "Please enter your full name",
                    city: "Please enter the city name"
                },
                submitHandler: function (form) {
                    console.log("Inside form submit");
                }
            });

            $('form[name =userformy]').submit(function (event) {
                event.preventDefault();

                let data = $(this).serialize();
                console.log("data sending to server for update", data);

                $.ajax({
                    url: endurl + "/br/admin/update-user",
                    type:"POST",
                    data:data,
                    contentType:"application/x-www-form-urlencoded"
                }).done(function () {
                    alert("user updation successfull");
                });

            });

        })

    });




})


function OnDeleteUser(elem) {
    var obj = {
        username : elem.id
    }
    $.post( endurl + "/br/admin/delete-user", obj,function( data ) {
        elem.closest(".user-layout").remove();
    });

}