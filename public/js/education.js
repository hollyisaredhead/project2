$(function () {

    if (sessionStorage.getItem("username") === "" ||
        sessionStorage.getItem("username") === null) {
        $(".logOut").text("Sign In");
        $(".submitComment").prop("disabled", true);
        $("#commentSection").val("Please sign in to add a comment.");
        $("#commentSection").prop("readonly", true);
    }
    else {
        $(".logOut").text("Log Out");
        $(".submitComment").prop("disabled", false);
        $("#commentSection").val("");
        $("#commentSection").prop("readonly", false);
    }

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
            error: function () {
                console.log("Error creating user. Make sure all fields are populated.");
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
                else if (data.username.toLowerCase() === user.username.toLowerCase() && data.pass === user.pass) {
                    sessionStorage.setItem("username", data.username)

                    location.href = "/html";
                }
                // Show message if user and pass don't match
                else (
                    console.log("Invalid username or password")
                )
            });
        };
    });

    $(".submitComment").on("click", function (event) {
        event.preventDefault();

        var newComment = {
            user: sessionStorage.getItem("username"),
            body: $("#commentSection").val().trim(),
            sectionId: $(this).attr("sectionId")
        };

        console.log(newComment)

        $.ajax("/api/comments", {
            type: "POST",
            data: newComment,
            success: function () {
                $("#commentSection").val("");
            },
            error: function () {
                console.log("Enter comment body.");
            }
        }).then(function () {
            location.reload()
        });
    });

    $(".deleteComment").on("click", function () {
        var id = $(this).data("id");

        if (sessionStorage.getItem("username") != $(this).data("username")) {
            console.log("Cannot delete other users' comments.")
        }
        else {
            $.ajax("api/comments/" + id, {
                type: "DELETE"
            }).then(
                function () {
                    console.log("Deleted comment of id: " + id);

                    location.reload();
                }
            );
        };
    });

    $(".logOut").on("click", function () {
        sessionStorage.clear();
    });
});