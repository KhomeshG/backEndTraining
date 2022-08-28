const newUserSchema = require("../models/newUserModel");
const commonMW = require("../middlewares/commonMiddlewares");

exports.user = async function (req, res) {
  let userBody = req.body;
  let userInput = commonMW.reqHeader;
  let userData = await (
    await newUserSchema.create(userBody)
  ).updateOne({ isFreeAppUser: userInput });
  res.send({ data: userData });
};
