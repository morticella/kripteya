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

  router.delete("/api/new-building/:id", checkAuth, (req, res, next) => {

    console.log(req.params.id);
    Building.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });


  module.exports = router;
