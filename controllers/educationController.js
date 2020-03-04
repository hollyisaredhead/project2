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
    res.render("html");
});

router.get("/css", function (req, res) {
    res.render("css");
});

router.get("/javascript", function (req, res) {
    res.render("javascript");
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
        res.json("success");
    }).catch(function () {
        console.log("error signing up, try again");
    });
});

module.exports = router;