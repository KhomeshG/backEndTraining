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

//Controllers import
const productController = require("../controllers/productController");
const newUserController = require("../controllers/newUserController");
const orderController = require("../controllers/orderController");

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
router.post("/products", productController.product);

//Write a POST api to create a user that takes user details from the request body with isFreeAppUser validation
router.post("/user", commonMW.freeUserChecker, newUserController.user);

//Write post Api for create Order

router.post("/order", commonMW.freeUserChecker, orderController.order);

module.exports = router;
