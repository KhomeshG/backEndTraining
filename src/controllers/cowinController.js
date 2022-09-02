let axios = require("axios");
const { get } = require("mongoose");
const { options } = require("../routes/route");

let getStates = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
    };
    let result = await axios(options);
    console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getDistricts = async function (req, res) {
  try {
    let id = req.params.stateId;
    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`,
    };
    let result = await axios(options);
    console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getByPin = async function (req, res) {
  try {
    let pin = req.query.pincode;
    let date = req.query.date;
    console.log(`query params are: ${pin} ${date}`);
    var options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`,
    };
    let result = await axios(options);
    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getOtp = async function (req, res) {
  try {
    let blahhh = req.body;

    console.log(`body is : ${blahhh} `);
    var options = {
      method: "post",
      url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
      data: blahhh,
    };

    let result = await axios(options);
    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

//01-09-2022
//Assignment on axios

//Q1
exports.findByDistrictId = async function (req, res) {
  try {
    let districtId = req.query.district_id;
    let date = req.query.date;
    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`,
    };
    let results = await axios(options);
    res.status(200).send({ data: results.data });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

//Q2
exports.findWheatherByCityName = async function (req, res) {
  try {
    let city = [
      "Bengaluru",
      "Mumbai",
      "Delhi",
      "Kolkata",
      "Chennai",
      "London",
      "Moscow",
    ];
    let store = [];
    for (let i = 0; i < city.length; i++) {
      cityName = city[i];
      let apiKey = req.query.appid;
      let options = {
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
      };
      let result = await axios(options);
      store.push({ City: city[i], temp: result.data.main.temp });
    }
    console.log(store.sort((a, b) => a.temp - b.temp));

    const sortByCities = store.sort((a, b) => a.temp - b.temp);

    res.status(200).send({ data: sortByCities });
    // let cityName = req.query.q;
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

//Q3
exports.memes = async function (req, res) {
  try {
    let template_id = req.query.template_id;
    let text0 = req.query.text0;
    let text1 = req.query.text1;
    let username = req.query.username;
    let password = req.query.password;
    //
    let options = {
      method: "post",
      url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`,
    };
    let result = await axios(options);
    res.status(200).send({ data: result.data });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};
module.exports.getStates = getStates;
module.exports.getDistricts = getDistricts;
module.exports.getByPin = getByPin;
module.exports.getOtp = getOtp;
