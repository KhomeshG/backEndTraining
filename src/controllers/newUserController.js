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
  let token = req.headers["x-auth-token"];
  let decodedToken = jwt.verify(
    token,
    "functionup-plutonium-trust-build-secret-key"
  );
  if (!decodedToken) {
    res.send("Token is invalid");
  }
  //Pass the userId as path param in the url

  let userId = req.params.userId;
  let userIdValidate = await newUserSchena.findById(userId);
  console.log(userIdValidate);
  if (!userIdValidate) {
    res.send("UserId is invalid");
  } else {
    res.send({ data: userIdValidate });
  }
};

//// Pass the userId as path param in the url and update the attributes received in the request body.

exports.updateUser = async function (req, res) {
  let token = req.headers["x-auth-token"];
  let decodedToken = jwt.verify(
    token,
    "functionup-plutonium-trust-build-secret-key"
  );
  if (!decodedToken) {
    res.send("Token is invalid");
  }
  //Pass the userId as path param
  let userIdPath = req.params.userId;
  let userIdValidator = await newUserSchena.findById(userIdPath);
  console.log(userIdValidator);
  if (!userIdValidator) {
    res.send("UserID is Invalid");
  }
  let userBody = req.body;
  let userDataUpdate = await newUserSchena.findByIdAndUpdate(
    { _id: userIdPath },
    userBody,
    { new: true }
  );
  res.send({ data: userDataUpdate });
};

//
exports.isdeleteUser = async function (req, res) {
  let token = req.headers["x-auth-token"];
  let decodedToken = jwt.verify(
    token,
    "functionup-plutonium-trust-build-secret-key"
  );
  if (!decodedToken) {
    res.send("Token is invalid");
  }

  //Pass the userId as path param

  let userIdPath = req.params.userId;
  let userIdValidator = await newUserSchena.findById(userIdPath);
  console.log(userIdValidator);
  if (!userIdValidator) {
    res.send("UserID is Invalid");
  }
  let userDatacheck = await newUserSchena.findByIdAndUpdate(
    { _id: userIdPath },
    { isDeleted: true },
    { new: true }
  );
  res.send({ data: userDatacheck });
};
