const express = require("express");
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController = require("../controllers/userController");
const BookController = require("../controllers/bookController");
//importing newBookSchema Modul
//const newBookSchema = require("../models/newBookModel");
const newBookController = require("../controllers/newBookController");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/createUser", UserController.createUser);

router.get("/getUsersData", UserController.getUsersData);

router.post("/createBook", BookController.createBook);

router.get("/getBooksData", BookController.getBooksData);

//Assignment 16August

//Creating newBook API

router.post("/creatBook", newBookController.creatBook);

//bookFind API
//bookList : gives all the books- their bookName and authorName only
router.get("/bookList", newBookController.bookList);

//getBooksInYear API
//getBooksInYear: takes year as input in post request and gives list of all books published that year

router.post("/getBooksInYear", newBookController.getBooksInYear);

//getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as a condition to fetch books that satisfy that condition

router.post("/getParticularBooks", newBookController.getParticularBooks);

//getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR”
router.get("/getXINRBooks", newBookController.getXINRBooks);

//getRandomBooks - returns books that are available in stock or have more than 500 pages
router.get("/getRandomBooks", newBookController.getRandomBooks);
module.exports = router;
