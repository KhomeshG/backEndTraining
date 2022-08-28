const newOrderModel = require("../models/newOrderModel");

exports.order = async function (req, res) {
  let orderBody = req.body;
  let orderReqHeader = req.headers["isfreeappuser"];
  let userValidate = await newUserSchema.findById(orderBody.userId);
  let productValidate = await newProductModel.findById(orderBody.productId);

  //Validate the userId. Send error if userId is invalid
  if (!userValidate) {
    res.send("UserId is Not-Found/or/ userId is Invalid");
  }

  //Validate the productId. Send the error if productId is invalid
  if (!productValidate) {
    res.send("productId is Not-Found/or/ productId is Invalid");
  }

  //For free app user, we dont check user's balance and create the order with 0 amount.
  if (orderReqHeader == "true") {
    let orderData = await newOrderModel.create({
      userId: orderBody.userId,
      productId: orderBody.productId,
      amount: 0,
      isFreeAppUser: true,
    });
    res.send({ data: orderData });
  }

  // We deduct the balance from user's balance and update the user. We create an order document
  else {
    let orderOldUserbalnce = await newUserSchema
      .findById(userValidate)
      .select({ balance: 1, _id: 0 });
    let orderPrice = await newProductModel
      .findById(productValidate)
      .select({ price: 1, _id: 0 });

    //For paid app user and the user has insufficient balance.
    // We send an error that the user doesn't have enough balance
    if (orderOldUserbalnce.balance < orderPrice.price) {
      res.send("You are Poor Earn Some Money");
    } else {
      //For paid user app and the user has sufficient balance.
      let orderDetails = await newUserSchema.findByIdAndUpdate(
        { _id: orderBody.userId },
        { balance: orderOldUserbalnce.balance - orderPrice.price },
        { new: true }
      );
      res.send({ status: orderDetails });
    }
  }
};
