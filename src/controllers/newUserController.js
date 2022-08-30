const newUserSchena = require("../models/newUserModel");
const jwt = require("jsonwebtoken");

// Write a **POST api /users** to register a user from the user details in request body
exports.user = async function (req, res) {
  try {
    let userBody = req.body;
    if (Object.keys(userBody).length != 0) {
      if (Object.keys(userBody.mobile).length == 10) {
        let userData = await newUserSchena.create(userBody);
        res.status(200).send({ data: userData });
      } else {
        res.status(400).send("Number Should be 10-Digits Only ");
      }
    } else {
      res.status(400).send("Dont Accept Blank Documents");
    }
  } catch (err) {
    res.status(500).send({ ErrorMessage: err.message, Name: err.name });
  }
};

//. Check that request must contain **x-auth-token** header.
// If absent, return a suitable error.6

exports.getuser = async function (req, res) {
  //Pass the userId as path param in the url
  try {
    let userId = req.params.userId;
    let userIdValidate = await newUserSchena.findById(userId);
    console.log(userIdValidate);

    //writing the logic for authorisation now so that a logged in user can modify or fetch ONLY their own data.

    if (!userIdValidate) {
      return res.status(400).send("UserId is invalid");
    } else {
      res.status(200).send({ data: userIdValidate });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//// Pass the userId as path param in the url and update the attributes received in the request body.

exports.updateUser = async function (req, res) {
  try {
    //Pass the userId as path param

    //Pass the userId as path param in the url
    let userId = req.params.userId;
    //finding userId in collection
    let userIdValidator = await newUserSchena.findById(userId);
    console.log(userIdValidator);
    //Validating UserID
    if (!userIdValidator) {
      res.status(400).send("UserID is Invalid");
    }
    //writing the logic for authorisation now so that a logged in user can modify or fetch ONLY their own data.

    //Taking Changes From user
    let userBody = req.body;
    let userDataUpdate = await newUserSchena.findByIdAndUpdate(
      { _id: userId },
      userBody,
      { new: true }
    );
    res.status(200).send({ data: userDataUpdate });
  } catch (err) {
    res
      .status(500)
      .send({ Error: err.message, msg: "there is problem in Server" });
  }
};

//
exports.isdeleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    //finding userId in collection
    let userIdValidator = await newUserSchena.findById(userId);
    console.log(userIdValidator);
    //Validating UserID
    if (!userIdValidator) {
      res.status(400).send("UserID is Invalid");
    }
    //Doing Changes as per questions/Requiremnet
    let userDatacheck = await newUserSchena.findByIdAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true }
    );
    res.status(200).send({ data: userDatacheck });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
