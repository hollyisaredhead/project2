var express = require("express");

var router = express.Router();

var db = require("../models")

router.get("/", function (req, res) {
    res.render("home");
});

router.get("/signup", function (req, res) {
    res.render("signup");
});

router.post("/api/createuser", function (req, res) {
    console.log(req.body);

    db.Users.create({
        username: req.body.username,
        email: req.body.email,
        pass: req.body.pass,
        role: req.body.role
    });
});

module.exports = router;