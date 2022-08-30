//Importing JWT(Jason Web Token)

const jwt = require("jsonwebtoken");
const headerChecker = function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"];
    if (token == undefined) {
      res
        .status(401)
        .send(
          "Header Contain Important value and its madatory/token must be present"
        );
    } else {
      next();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const authentication = function (req, res, next) {
  try {
    //Taking Token From Header
    let token = req.headers["x-auth-token"];
    //Verifiing Token using Jwt.verify() function
    let decodedToken = jwt.verify(
      token,
      "functionup-plutonium-trust-build-secret-key"
    );
    //validating token
    if (!decodedToken) {
      return res.status(401).send("token is Invaid");
    }
    //taking userId from path params
    let userId = req.params.userId;

    //Checking login user is Valid or Imposter
    if (decodedToken.userId != userId) {
      return res.status(403).send("User is Imposter");
    } else {
      next();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.headerChecker = headerChecker;
module.exports.authentication = authentication;
