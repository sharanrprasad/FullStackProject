$(function () {
    $("#loginform").validate({
        rules: {
            username: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            username: "Please enter a valid email address"
        },

        submitHandler: function (form) {
            console.log("Success in validating form submit");
            form.submit();
        }
    });


    $("#signupform").validate({
        rules: {
            username: {
                required: true,
                email: true
            },
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
            username: "Please enter a valid email address",
            name : "Please enter your full name",
            city : "Please enter the city name"
        },

        submitHandler: function (form) {
            form.submit();
        }
    });


});
