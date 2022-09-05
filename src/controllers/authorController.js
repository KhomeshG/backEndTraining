const authorModel = require("../models/authorModel");

const isValid = function (value) {
  if (typeof value === "undefined" || value === Number || value === null)
    return false;
  // if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const authors = async function (req, res) {
  try {
    let data = req.body;

    //Validating Empty Document

    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "data is required" });
    }

    //Validating FirstNAme Document(madatory)
    if (!isValid(data.fname)) {
      return res.status(400).send({ status: false, msg: "fname is required" });
    }

    //Validating LasttNAme Document(madatory)
    if (!isValid(data.lname)) {
      return res.status(400).send({ status: false, msg: "lname is required" });
    }

    //Validating  title(madatory)
    if (!isValid(data.title)) {
      return res.status(400).send({ status: false, msg: "title is required" });
    }

    ////Validating Email(madatory)
    let regexPattern = /@gmail.com$/;
    let emailVlidation = regexPattern.test(req.body.email);
    if (emailVlidation == false) {
      return res
        .status(400)
        .send({ msg: "Email Should Conatain @gmail.com in the ending" });
    }

    //Validating Password(madatory)
    if (!isValid(data.password)) {
      return res
        .status(400)
        .send({ status: false, msg: "password is required" });
    }

    //if all fine
    else {
      let savedData = await authorModel.create(data);
      res.status(201).send({ msg: savedData });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ ErrorName: err.name, ErrorMessage: err.message });
  }
};

module.exports.authors = authors;
