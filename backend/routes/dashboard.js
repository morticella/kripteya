const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkAuth = require("../middleware/check-auth");

const User = require("../models/users");

const router = express.Router();

router.post("/api/dashboard/main",checkAuth, (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    //Model
    const user = new User({
      user: req.body.user,
      password: hash,
      level: req.body.level
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});


module.exports = router;
