const express = require("express");
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController = require("../controllers/userController");
const BookController = require("../controllers/bookController");
const commonMW = require("../middlewares/commonMiddlewares");

//25Aug middleware 2

const newProductModel = require("../models/newProductModel");
const newUserSchema = require("../models/newUserModel");
const newOrderModel = require("../models/newOrderModel");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/createBook", BookController.createBook);

router.post("/createUser", UserController.createUser);
// router.get("/getUsersData", UserController.getUsersData)

// const mid1= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid1")
//     // logic
//     let loggedIn = false

//     if (loggedIn== true) {
//         console.log( "OK LOGGED IS IS TRUE NOW")
//         next ()
//     }
//     else {
//         res.send ("Please login or register")
//     }
// }

// // e.g. restricted and open-to-all API's can be handled like below now:
// router.get('/homePage', mid1, UserController.feeds)
// router.get('/profileDetails', mid1, UserController.profileDetails)
// router.get('/friendList', mid1, UserController.friendList)
// router.get('/changePassword', mid1, UserController.changePassword)

// router.get('/termsAndConditions',  UserController.termsAndConditions)
// router.get('/register',  UserController.register)

router.get(
  "/basicRoute",
  commonMW.mid1,
  commonMW.mid2,
  commonMW.mid3,
  commonMW.mid4,
  UserController.basicCode
);

// router.get("/basicRoute2", commonMW.mid1, UserController.basicCode2)
// router.get("/basicRoute3", commonMW.mid2, UserController.basicCode3)
// router.get("/basicRoute4", commonMW.mid1, commonMW.mid4, UserController.basicCode4)

//Assignment 25 August 2022
//Middleware part 2

//Write a POST api to create a product from the product details in request body.
router.post("/products", async function (req, res) {
  let productBody = req.body;
  let productData = await newProductModel.create(productBody);

  res.send({ data: productData });
});

//Write a POST api to create a user that takes user details from the request body with isFreeAppUser validation
router.post("/user", commonMW.freeUserChecker, async function (req, res) {
  let userBody = req.body;
  let userInput = commonMW.reqHeader;
  let userData = await (
    await newUserSchema.create(userBody)
  ).updateOne({ isFreeAppUser: userInput });
  res.send({ data: userData });
});

//Write post Api for create Order

router.post("/order", commonMW.freeUserChecker, async function (req, res) {
  let orderBody = req.body;
  let userValidate = await newUserSchema.findById(orderBody.userId);
  let productValidate = await newProductModel.findById(orderBody.productId);
  if (!userValidate) {
    res.send("UserId is Not-Found/or/ userId is Invalid");
  }
  if (!productValidate) {
    res.send("productId is Not-Found/or/ productId is Invalid");
  }
  if (commonMW.reqHeader == true) {
    let orderData = await newOrderModel.create(orderBody, {
      amount: 0,
      isFreeAppUser: true,
    });
    res.send({ data: orderData });
  } else {
    res.send("Not Working");
  }
});

module.exports = router;
