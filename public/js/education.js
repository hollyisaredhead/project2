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
        if (user.username === '') {
            console.log("Please enter username.")
        }
        else if (user.pass === '') {
            console.log("Please enter password.")
        }
        else {
            $.get("/api/users/" + user.username).then(function (data) {
                if (data === null) {
                    console.log("User not found.");
                }
                else if (data.username === user.username && data.pass === user.pass) {
                    sessionStorage.setItem("username", user.username)

                    location.href = "/html";
                }
                else (
                    console.log("Invalid username or password")
                )
            });
        }


    })
});