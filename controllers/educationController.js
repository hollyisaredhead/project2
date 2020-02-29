var express = require("express");

var router = express.Router();

var users = require("../models/users.js");
var comments = require("../models/comments.js");

router.get("/", function (req, res) {
    res.render("home");
})


module.exports = router;