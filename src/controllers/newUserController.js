const newUserSchena = require("../models/newUserModel");
const jwt = require("jsonwebtoken");

// Write a **POST api /users** to register a user from the user details in request body
exports.user = async function (req, res) {
  let userBody = req.body;
  let userData = await newUserSchena.create(userBody);
  res.send({ data: userData });
};

//. Check that request must contain **x-auth-token** header.
// If absent, return a suitable error.6

exports.getuser = async function (req, res) {
  //Pass the userId as path param in the url

  let userId = req.params.userId;
  let userIdValidate = await newUserSchena.findById(userId);
  console.log(userIdValidate);

  //writing the logic for authorisation now so that a logged in user can modify or fetch ONLY their own data.

  if (!userIdValidate) {
    return res.send("UserId is invalid");
  } else {
    res.send({ data: userIdValidate });
  }
};

//// Pass the userId as path param in the url and update the attributes received in the request body.

exports.updateUser = async function (req, res) {
  //Pass the userId as path param

  //Pass the userId as path param in the url
  let userId = req.params.userId;
  //finding userId in collection
  let userIdValidator = await newUserSchena.findById(userId);
  console.log(userIdValidator);
  //Validating UserID
  if (!userIdValidator) {
    res.send("UserID is Invalid");
  }
  //writing the logic for authorisation now so that a logged in user can modify or fetch ONLY their own data.

  //Taking Changes From user
  let userBody = req.body;
  let userDataUpdate = await newUserSchena.findByIdAndUpdate(
    { _id: userId },
    userBody,
    { new: true }
  );
  res.send({ data: userDataUpdate });
};

//
exports.isdeleteUser = async function (req, res) {
  let userId = req.params.userId;
  //finding userId in collection
  let userIdValidator = await newUserSchena.findById(userId);
  console.log(userIdValidator);
  //Validating UserID
  if (!userIdValidator) {
    res.send("UserID is Invalid");
  }
  //Doing Changes as per questions/Requiremnet
  let userDatacheck = await newUserSchena.findByIdAndUpdate(
    { _id: userId },
    { isDeleted: true },
    { new: true }
  );
  res.send({ data: userDatacheck });
};
