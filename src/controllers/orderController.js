const newOrderModel = require("../models/newOrderModel");

exports.order = async function (req, res) {
  let orderBody = req.body;
  let orderReqHeader = req.headers["isfreeappuser"];
  let userValidate = await newUserSchema.findById(orderBody.userId);
  let productValidate = await newProductModel.findById(orderBody.productId);
  if (!userValidate) {
    res.send("UserId is Not-Found/or/ userId is Invalid");
  }
  if (!productValidate) {
    res.send("productId is Not-Found/or/ productId is Invalid");
  }
  if (orderReqHeader == "true") {
    let orderData = await newOrderModel.create({
      userId: orderBody.userId,
      productId: orderBody.productId,
      amount: 0,
      isFreeAppUser: true,
    });
    res.send({ data: orderData });
  } else {
    let orderOldUserbalnce = await newUserSchema
      .findById(userValidate)
      .select({ balance: 1, _id: 0 });
    let orderPrice = await newProductModel
      .findById(productValidate)
      .select({ price: 1, _id: 0 });
    if (orderOldUserbalnce.balance < orderPrice.price) {
      res.send("You are Poor Earn Some Money");
    } else {
      let orderDetails = await newUserSchema.findByIdAndUpdate(
        { _id: orderBody.userId },
        { balance: orderOldUserbalnce.balance - orderPrice.price },
        { new: true }
      );
      res.send({ status: orderDetails });
    }
  }
};
