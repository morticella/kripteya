const express = require("express");

const checkAuth = require("../middleware/check-auth");

const Report = require("../models/reports");

const router = express.Router();

//SignUp Method

router.post("/api/new-report",checkAuth, function (req, res) {

    //Model
    const report = new Report({
      now: req.body.now,
      namePayment: req.body.namePayment,
      nameBuilding: req.body.nameBuilding,
      from: req.body.from,
      to: req.body.to,
      amount: req.body.amount,
      deposit: req.body.deposit,
      info: req.body.info,
      type: req.body.type,
      paymentType: req.body.paymentType

    });
    report.save()
      .then(result => {
        res.status(200).json({
          message: "Report created!",
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

  router.put("/api/new-report/:id",checkAuth, (req, res, next) => {

    let report = {};
    report.name = req.body.name;
    report.rent = req.body.rent;
    report.deposit = req.body.deposit;
    report.notice = req.body.notice;
    report.booked = req.body.booked;

    Report.updateOne({ _id: req.params.id }, report).then(
      () => {
        res.status(200).json({ message: "Report Updated!" });
      }
    )
    .catch(
      () => {
        res.status(500).json({ message: "Unknown error on delete Report API!" });
      }
    );
  });

  router.delete("/api/new-report/:id", checkAuth, (req, res, next) => {

    // console.log(req.params.id);
    Report.deleteOne({ _id: req.params.id }).then(() => {
      // console.log(result);
      res.status(200).json({ message: "Report deleted!" });
    });
  });


  module.exports = router;
