const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

const router = express.Router();

//SignUp Method

router.post("/api/signup", function (req, res) {

  var atob = require('atob');
      let passHash =  atob(req.body.password);
  bcrypt.hash(passHash, 10).then(hash => {

    //Model
    const user = new User({
      user: req.body.user,
      password: hash,
      level: req.body.level
    });
    user
      .save()
      .then(result => {
        const token = jwt.sign(
          { user: user.user, userId: user.hash },
          "all_heilòljdfavonioeuòvbònx,oog.C°Slgcèpxohi455poivd5454oiu98798789hnvto098pdnuyiodutbn@#^§oiutyidoudvbdxviycv",
          { expiresIn: "4h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600*4,
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

// Login Method + Token

router.post("/api/login", (req, res, next) => {

  let fetchedUser;

  User.findOne({ user: req.body.user })
    .then(userCheck => {
      if (!userCheck) {

        return res.status(401).json({
          message: "Auth failed"
        });
      }

      fetchedUser = userCheck;
      var atob = require('atob');
      let passHash =  atob(req.body.password);
      // console.log('Hash', passHash);
      return bcrypt.compare(passHash, userCheck.password);
    })
    .then(result => {

      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { user: fetchedUser.user, userId: fetchedUser._id },
        "all_heilòljdfavonioeuòvbònx,oog.C°Slgcèpxohi455poivd5454oiu98798789hnvto098pdnuyiodutbn@#^§oiutyidoudvbdxviycv",
        { expiresIn: "4h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600*4
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router;
