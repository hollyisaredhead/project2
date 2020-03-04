$(function () {
    $(".newUser").on("submit", function (event) {
        event.preventDefault();

        var newUser = {
            username: $("#inputUsername").val().trim(),
            email: $("#inputEmail").val().trim(),
            pass: $("#inputPassword").val().trim(),
            role: $("#roleSelect").val()
        };

        // POST request
        $.ajax("/api/users", {
            type: "POST",
            data: newUser,
            success: function () {
                sessionStorage.setItem("username", newUser.username);

                location.href = "/html";

            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    $(".signIn").on("submit", function (event) {
        event.preventDefault();

        var user = {
            username: $("#inputUsername").val().trim(),
            pass: $("#inputPassword").val().trim()
        }

        // Input validation for sign in 
        if (user.username === '') {
            console.log("Please enter username.")
        }
        else if (user.pass === '') {
            console.log("Please enter password.")
        }
        else {
            $.get("/api/users/" + user.username).then(function (data) {

                // Validation for if user not found
                if (data === null) {
                    console.log("User not found.");
                }
                // If user and pass match, set session storage and go to main page
                else if (data.username === user.username && data.pass === user.pass) {
                    sessionStorage.setItem("username", user.username)

                    location.href = "/html";
                }
                // Show message if user and pass don't match
                else (
                    console.log("Invalid username or password")
                )
            });
        };
    });

});