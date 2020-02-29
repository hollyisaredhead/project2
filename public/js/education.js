$(function () {
    $(".newUser").on("submit", function (event) {
        event.preventDefault();

        var newUser = {
            username: $("#inputUsername").val().trim(),
            email: $("#inputEmail").val().trim(),
            pass: $("#inputPassword").val().trim(),
            role: $("#roleSelect").val()
        };

        console.log(newUser);
        // POST request
        $.ajax("/api/createuser", {
            type: "POST",
            data: newUser
        }).then(
            function () {
                console.log(newUser)
                console.log("New user created.");

                //Add route to main page ?
                //=======================
            }
        );
    });
});