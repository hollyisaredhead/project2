var express = require("express");

var router = express.Router();

var db = require("../models")

router.get("/", function (req, res) {
    res.render("home");
});

router.get("/home", function (req, res) {
    res.render("home");
});

router.get("/signup", function (req, res) {
    res.render("signup");
});

router.get("/html", function (req, res) {
    db.Comments.findAll({
        where: {
            sectionId: "html"
        }
    }).map(el => el.get({ plain: true }))
        .then(function (dbComments) {
            var hbsObject = {
                comments: dbComments
            }

            res.render("html", hbsObject);
        });

});

router.get("/stylesheets", function (req, res) {
    db.Comments.findAll({
        where: {
            sectionId: "css"
        }
    }).map(el => el.get({ plain: true }))
        .then(function (dbComments) {
            var hbsObject = {
                comments: dbComments
            }

            res.render("css", hbsObject);
        });

});

router.get("/javascript", function (req, res) {
    db.Comments.findAll({
        where: {
            sectionId: "javascript"
        }
    }).map(el => el.get({ plain: true }))
        .then(function (dbComments) {
            var hbsObject = {
                comments: dbComments
            }

            res.render("javascript", hbsObject);
        });

});

router.get("/api/users/:username", function (req, res) {
    db.Users.findOne({
        where: {
            username: req.params.username
        }
    }).then(function (result) {
        return res.json(result);
    });
});

router.post("/api/users", function (req, res) {

    db.Users.create({
        username: req.body.username,
        email: req.body.email,
        pass: req.body.pass,
        role: req.body.role
    }).then(function () {
        res.json("User added successfully!");
    }).catch(function () {
        console.log("Error signing up, try again.");
        res.status(400).send({ error: "Error signing up, try again." });
    });
});

router.post("/api/comments", function (req, res) {
    db.Comments.create({
        user: req.body.user,
        body: req.body.body,
        sectionId: req.body.sectionId
    }).then(function () {
        res.json("Comment added successfully!")
    }).catch(function () {
        console.log("Error submitting comment, try again.")
        res.status(400).send({ error: "Error submitting comment, try again." });
    });
});

router.put("/api/comments/:id", function (req, res) {

    console.log(req.body);

    db.Comments.update(
        { body: req.body.comment },
        { where: { id: req.params.id } }
    ).then(function () {
        res.json("Comment updated successfully!");
    }).catch(function () {
        console.log("Error updating comment.");
        res.status(400).send({ error: "Error updating comment." });
    })
});

router.delete("/api/comments/:id", function (req, res) {
    db.Comments.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.json("Comment deleted successfully!");
    });
});

module.exports = router;