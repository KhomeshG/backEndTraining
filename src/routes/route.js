const express = require("express");
const { addBooks, findAllBooks } = require("../controllers/bookController");
const router = express.Router();
//
const bookController = require("../controllers/bookController");
// const UserController = require("../controllers/userController");

// router.get("/test-me", function (req, res) {
//   res.send("My first ever api!");
// });

// router.post("/createUser", UserController.createUser);

// router.get("/getUsersData", UserController.getUsersData);

// module.exports = router;
//------------------------------------------------------------------
//====================================================================================
//-------------Assignment Aug 13--------Book Schema--------------------
//----------------------------------------------Assignment----------------------------------
//==============================================
router.get("/test", function (req, res) {
  res.send("Its Working Fine");
});

// -----------------------------------------------------------------
//Creating API for Add Book
//Using Post Method because I want to Create on server
router.post("/books-post", bookController.addBooks);

//Creating API to Find a Book In DB
//Using Get method(https Method ) We get data which is present at server
router.get("/books-get", bookController.findAllBooks);
//TypeError: Router.use() requires a middleware function but got a Object
module.exports = router;
