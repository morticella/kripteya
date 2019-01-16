const express = require("express");

const checkAuth = require("../middleware/check-auth");

const Room = require("../models/rooms");

const router = express.Router();

//SignUp Method

router.post("/api/new-room",checkAuth, function (req, res) {

    //Model

    const room = new Room({
      idBuilding: req.body.idBuilding,
      name: req.body.name,
      beds: req.body.beds,
      rent: req.body.rent,
      gender: req.body.gender,
      deposit: req.body.deposit,
    });
    room.save()
      .then(result => {
        res.status(200).json({
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

  router.put("/api/new-room/:id",checkAuth, (req, res, next) => {

    let room = {};
    room.name = req.body.name;
    room.gender = req.body.gender;
    room.beds = req.body.beds;
    room.rent = req.body.rent;
    room.deposit = req.body.deposit;


    Room.updateOne({ _id: req.params.id }, room).then(
      () => {
        res.status(200).json({ message: "Room Updated!" });
      }
    )
    .catch(
      () => {
        res.status(500).json({ message: "Unknown error on delete Room API!" });
      }
    );
  });

  router.delete("/api/new-room/:id", checkAuth, (req, res, next) => {

    // console.log(req.params.id);
    Room.deleteOne({ _id: req.params.id }).then(() => {
      // console.log(result);
      res.status(200).json({ message: "Room deleted!" });
    });
  });


  module.exports = router;
