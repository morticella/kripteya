const express = require("express");

const checkAuth = require("../middleware/check-auth");

const Building = require("../models/buildings");

const router = express.Router();

//SignUp Method

router.post("/api/new-building",checkAuth, function (req, res) {

    //Model
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

  router.put("/api/new-building/:id",checkAuth, (req, res, next) => {

    let building = {};

    building.nameBuilding = req.body.nameBuilding;
    building.address = req.body.address;
    building.info = req.body.info;

    console.log('Building', building);
    Building.updateOne({ _id: req.params.id }, building).then(
      res.status(200).json({ message: "Post Updated!" }),
      res => console.log(res)
    )
    .catch(
      error => console.log(error)
    );

  });

  router.delete("/api/new-building/:id", checkAuth, (req, res, next) => {

    // console.log(req.params.id);
    Building.deleteOne({ _id: req.params.id }).then(result => {
      // console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });


  module.exports = router;
