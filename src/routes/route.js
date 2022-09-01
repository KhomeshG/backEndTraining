const express = require("express");
const router = express.Router();
const CowinController = require("../controllers/cowinController");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.get("/cowin/states", CowinController.getStates);
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts);
router.get("/cowin/getByPin", CowinController.getByPin);

router.post("/cowin/getOtp", CowinController.getOtp);

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date

//date August 01-09-2022
//Q1
router.get("/cowin/findByDistrictId", CowinController.findByDistrictId);

//Q2
router.get("/cowin/findWheatherByCityName", CowinController.findByDistrictId);

module.exports = router;
