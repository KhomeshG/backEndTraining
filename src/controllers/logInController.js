const newUserSchena = require("../models/newUserModel");
const jwt = require("jsonwebtoken");

//Write a **\*POST api /login** to login a user that takes user details - ..
exports.newLogin = async function (req, res) {
  //email and password from the request body

  let loginBody = req.body;
  let userEmailPassWordValidate = await newUserSchena.findOne({
    emailId: loginBody.emailId,
    password: loginBody.password,
  });
  //let userPasswordValidate = await newUserSchena.find();

  // If the credentials don't match with any user's data return a suitable error
  if (!userEmailPassWordValidate) {
    res.send("Email address is invalid / this email Id is not Register");
  }
  //   if (!userPasswordValidate) {
  //     res.send("Password is Incorrect");
  //   }

  //On successful login, generate a JWT token and return it in response body
  let token = jwt.sign(
    {
      userId: userEmailPassWordValidate._id.toString(),
      batch: "Plutonium",
      organisation: "FunctionUp",
    },
    "functionup-plutonium-trust-build-secret-key"
  );
  res.setHeader("x-auth-token", token);
  res.send({ token: token });
};
