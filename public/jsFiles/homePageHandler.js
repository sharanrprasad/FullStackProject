var endurl = "https://safe-shore-55413.herokuapp.com";

//var endurl = "http://127.0.0.1:3000";


$(function () {
        $.getJSON( endurl+"/user-home//get-widgets",function (widgetsData) {
           widgetsData.forEach( (widget,i) => {
               console.log("class name is" ,widget.className);
                var htmlString = "<div class=\"col-lg-3 col-md-6 mb-4\"> "+
                    "<div class=\"card\">"+
                    "<i class= " + "\"" + widget.className+  "\"" + "style=\"font-size:48px;color:black\"></i>"+
                    "<div class=\"card-body\">  "+
                    " <h4 class=\"card-title\"> " +  widget.name +"</h4>"+
                    " <p class=\"card-text\">" + widget.description + "</p>" +
                    "   </div>"+
                    "<div class=\"card-footer\">"+
                    "<button type='button' id =" + "\"" +widget.id + "\""  + " class= \"btn btn-primary\" onclick = \"OnBuy(this)\">Buy!</button>"+
                    "</div>\n" +
                    "  </div>\n" +
                    "</div>";
                console.log("widget id  " ,htmlString);
                $("#main-row").append(htmlString);
           });

        });

        $.getJSON(endurl + "/user-home/get-weather",function (data) {
                console.log("weather");
                try{
                    let currentWeather = "<div class= \"col-md-4 mb-4\"> <div class=\"card h-100\"> <div class=\"card-body\">  <h2 class=\"card-title\">Current</h2> " +
                    "<p class=\"card-text\"> " +data[0].current.skytext+ "</p>"+
                    "<p class=\"card-text\"> Tempearature " +data[0].current.temperature+ "</p>"+
                    "</div> </div> </div>";
                    $("#city").text(data[0].location.name);
                    $("#weather-row").append(currentWeather);

                    for(let i =0; i< 2 && data[0].forecast.length;i++){

                        let forecast = "<div class= \"col-md-4 mb-4\"> <div class=\"card h-100\"> <div class=\"card-body\">  <h2 class=\"card-title\"> "+
                            data[0].forecast[i].day + "</h2> " +
                            "<p class=\"card-text\"> " +data[0].forecast[i].skytextday+ "</p>"+
                            "</div> </div> </div>";
                        $("#weather-row").append(forecast);

                    }


                }catch (err){
                    $("#weather-row").append("<p class=\"card-title\">Weather Currently Unavilable</p>");
                }
        })

    $("#myaccount").click(function () {
        $.get( endurl +"/user-myaccount",function( data ) {
            $("body").html(data);
        });
    })


})



function OnBuy(elem) {
    console.log(elem.id)

    var obj = {
        id : elem.id
    }
    $.post( endurl + "/user-home/buy-widget", obj,function( data ) {
        $("body").html(data);
    });
}



