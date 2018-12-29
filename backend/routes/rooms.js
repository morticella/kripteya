const express = require("express");

const checkAuth = require("../middleware/check-auth");

const Room = require("../models/rooms");

const router = express.Router();

//SignUp Method

router.post("/api/new-room",checkAuth, function (req, res) {

    //Model
    console.log('niente ?',req.body)
    const room = new Room({
      nameBuilding: req.body.nameBuilding,
      name: req.body.name,
      beds: req.body.beds,
      rent: req.body.rent,
      deposit: req.body.deposit,
      notice: req.body.notice,
      booked: req.body.booked

    });
    room.save()
      .then(result => {
        res.status(201).json({
          message: "Room created!",
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

  // router.put("/api/new-room/:id",checkAuth, (req, res, next) => {

  //   let building = {};
  //   building.nameBuilding = req.body.nameBuilding;
  //   building.address = req.body.address;
  //   building.info = req.body.info;
  //   // const building = new Building({
  //   //   nameBuilding: req.body.nameBuilding,
  //   //   address: req.body.address,
  //   //   info: req.body.info
  //   // });
  //   //console.log('Building', building);
  //   Building.updateOne({ _id: req.params.id }, building).then(
  //     res => console.log(res)
  //   )
  //   .catch(
  //     error => console.log(error)
  //   );

  // });

  // router.delete("/api/new-room/:id", checkAuth, (req, res, next) => {

  //   // console.log(req.params.id);
  //   Building.deleteOne({ _id: req.params.id }).then(result => {
  //     // console.log(result);
  //     res.status(200).json({ message: "Post deleted!" });
  //   });
  // });


  module.exports = router;
