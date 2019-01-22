const express = require("express");

const checkAuth = require("../middleware/check-auth");

const Customer = require("../models/customers");

const router = express.Router();

//SignUp Method

router.post("/api/new-customer",checkAuth, function (req, res) {

    //Model
    const customer = new Customer({
      idBuilding: req.body.idBuilding,
      idRoom: req.body.idRoom,
      name: req.body.name,
      rent: req.body.rent,
      deposit: req.body.deposit,
      notice: req.body.notice,
      booked: req.body.booked
    });
    customer.save()
      .then(result => {
        res.status(200).json({
          message: "Customer created!",
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

  router.put("/api/new-customer/:id",checkAuth, (req, res, next) => {

    let customer = {};
    customer.name = req.body.name;
    customer.rent = req.body.rent;
    customer.deposit = req.body.deposit;
    customer.notice = req.body.notice;
    customer.booked = req.body.booked;

    Customer.updateOne({ _id: req.params.id }, customer).then(
      () => {
        res.status(200).json({ message: "Customer Updated!" });
      }
    )
    .catch(
      () => {
        res.status(500).json({ message: "Unknown error on delete Customer API!" });
      }
    );
  });

  router.delete("/api/new-customer/:id", checkAuth, (req, res, next) => {

    // console.log(req.params.id);
    Customer.deleteOne({ _id: req.params.id }).then(() => {
      // console.log(result);
      res.status(200).json({ message: "Customer deleted!" });
    });
  });


  module.exports = router;
