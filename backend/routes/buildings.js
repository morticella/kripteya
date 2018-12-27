const express = require("express");

const checkAuth = require("../middleware/check-auth");

const Building = require("../models/buildings");

const router = express.Router();

//SignUp Method

router.post("/api/new-building",checkAuth, function (req, res) {

    //Model
    console.log(req.body)
    const building = new Building({
      nameBuilding: req.body.nameBuilding,
      address: req.body.address,
      info: req.body.info,
      // rooms: req.body.rooms
    });
    building.save()
      .then(result => {
        res.status(201).json({
          message: "Building created!",
          result: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  module.exports = router;
