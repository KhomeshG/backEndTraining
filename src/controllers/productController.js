const newProductModel = require("../models/newProductModel");
//Importing module

//
exports.product = async function (req, res) {
  let productBody = req.body;
  let productData = await newProductModel.create(productBody);

  res.send({ data: productData });
};
