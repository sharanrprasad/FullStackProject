$(function () {
    $.getJSON("http://127.0.0.1:3000/user-myaccount/user-widgets",function (data) {
        console.log(data);

        var num = data.num;
        if(num == 0){


        }else {
            let widgetData = data.data;
            widgetData.forEach((widget, i) => {
                var htmlString = "<div class=\"col-lg-3 col-md-6 mb-4\"> " +
                    "<div class=\"card\">" +
                    "<i class= " + "\"" + widget.className+  "\"" + "style=\"font-size:48px;color:black\"></i>"+
                    "<div class=\"card-body\">  " +
                    " <h4 class=\"card-title\"> " + widget.name + "</h4>" +
                    " <p class=\"card-text\">" + widget.description + "</p>" +
                    "   </div>" +
                    "<div class=\"card-footer\">" +
                    "</div>\n" +
                    "  </div>\n" +
                    "</div>";
                $("#main-row").append(htmlString);
            });
        }

    });

    $("#back").click(function () {
        $.get( "http://127.0.0.1:3000/user-home",function( data ) {
            $("body").html(data);
        });
    })



})