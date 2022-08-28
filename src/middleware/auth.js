const headerChecker = function (req, res, next) {
  let token = req.headers["x-auth-token"];
  if (token == undefined) {
    res.send(
      "Header Contain Important value and its madatory/token must be present"
    );
  } else {
    next();
  }
};

module.exports.headerChecker = headerChecker;
