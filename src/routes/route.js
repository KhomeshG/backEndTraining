const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
//25 August 2022
//Importing Controllers
const newuserController = require("../controllers/newUserController");
const loginController = require("../controllers/logInController");
const commanMiddleware = require("../middleware/auth");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/users", userController.createUser);

router.post("/login", userController.loginUser);

//The userId is sent by front end
router.get("/users/:userId", userController.getUserData);

router.put("/users/:userId", userController.updateUser);

//August 27 assignment

// Write a **POST api /users** to register a user from the user details in request body
router.post("/newUsers", newuserController.user);

// Write a **\*POST api /login** to login a user that takes user details
router.post("/newLogin", loginController.newLogin);

//Write a **GET api /users/:userId** to fetch user details
//Pass the userId as path param in the url. Check that request must contain **x-auth-token** header.
// If absent, return a suitable error.6
router.get(
  "/newUsers/:userId",
  commanMiddleware.headerChecker,
  newuserController.getuser
  //:userId is path param here
);

//Write a **PUT api /users/:userId** to update user details.

//Check that request must contain ** x - auth - token ** header.If absent, return a suitable error.
router.put(
  "/newUsers/:userId",
  commanMiddleware.headerChecker,
  newuserController.updateUser
);

//Write a **DELETE api /users/:userId** that takes the userId in the path params and marks the isDeleted attribute for a user as true.
//Check that request must contain **x-auth-token** header. If absent, return a suitable error.
router.delete(
  "/newUsers/:userId",
  commanMiddleware.headerChecker,
  newuserController.isdeleteUser
);
module.exports = router;
