$(function () {

    if (sessionStorage.getItem("username") === "" ||
        sessionStorage.getItem("username") === null) {
        $(".logOut").text("Sign In");
        $(".submitComment").prop("disabled", true);
        $("#commentSection").val("Please sign in to add a comment.");
        $("#commentSection").prop("readonly", true);

        $(".navUsername").text("");

    }
    else {
        $(".logOut").text("Log Out");
        $(".submitComment").prop("disabled", false);
        $("#commentSection").val("");
        $("#commentSection").prop("readonly", false);

        $(".navUsername").text(`Logged in as: ${sessionStorage.getItem("username")}`);

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

    $(".editComment").on("click", function () {
        var id = $(this).data("id");

        if (sessionStorage.getItem("username") != $(this).data("username")) {
            console.log("Cannot edit other users' comments.")
        }
        else {
            var commentText = $(`#commentId${id}`).text();

            if ($(this).data("editorsave") === "edit") {
                $(this).data("editorsave", "save");

                $(`#commentId${id}`)
                    .html(`<div class="col-sm-8 commentBody" id="commentId${id}">
                        <textarea class="editCommentVal${id}">${commentText}</textarea>
                    </div>`);

                $(`#editId${id}`).html('<i class="far fa-save fa-sm"></i>');
            }
            else {
                $(this).data("editorsave", "edit");
                var editedComment = {
                    comment: $(`.editCommentVal${id}`).val().trim()
                };

                $.ajax("/api/comments/" + id, {
                    type: "PUT",
                    data: editedComment,
                    success: function () {
                        $(`#commentId${id}`)
                            .html(`${editedComment.comment}`);
                        $(`#editId${id}`).html('<i class="far fa-edit fa-sm">');
                    },
                    error: function () {
                        $(`#commentId${id}`)
                            .html(`${commentText}`);
                        console.log("error editing the comment");
                    }
                }).then(function () {
                    $(`#editId${id}`).html('<i class="far fa-edit fa-sm">');
                });
            };
        };
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

    // Stack overflow api
    function generateStack() {
        var searchText = $("#search").val();
        $.ajax({
            url: `https://api.stackexchange.com/2.2/similar?order=desc&sort=relevance&title=${searchText}&site=stackoverflow`,
            method: "GET"
        }).then(function (response) {
            console.log(response);



            $(".stackResults").html("<h4 class='pl-2' id='stackHeader'>Stack Overflow Results:</h4><ul class='list'></ul>");


            for (var i = 0; i < 5; i++) {

                var stackMediaObject = $('<li class="stackInfo"><a href=' + response.items[i].link + ' target="_blank">' + response.items[i].title + '</a></li>')

                console.log(stackMediaObject);
                $(".list").append(stackMediaObject);

            }

        });
    }

    $("#stackBtn").on("click", function () {

        $(".stackResults").empty();

        generateStack();

    })

    $(".logOut").on("click", function () {
        sessionStorage.clear();
    });
});

