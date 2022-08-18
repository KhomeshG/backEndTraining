const express = require("express");
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController = require("../controllers/userController");
const BookController = require("../controllers/bookController");
//importing newBookSchema Modul
const newBookController = require("../controllers/newBookController");
//importing nBookSchema Module
const nBookSchema = require("../models/nBookSchema");
//importing authorScchema Module
const authorModule = require("../models/authorsSchemaModel");
//importing Controller
const authorBookController = require("../controllers/authorBookController");

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

router.get("getParticularBooks", async function (req, res) {
  let bodyData = req.body;
  // getting userInput throught bodys
  let bookData = await newBookSchema.find(bodyData);
  res.send({ msg: bookData });
});

//getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR”
router.get("getXINRBooks", async function (req, res) {
  // let fetchByBookPrice = await newBookSchema.find({
  //   "prices.indian": { $in: ["100INR","200INR", "300INR"] },
  // });
  let fetchByBookPrice = await newBookSchema.find({
    $or: [
      { "prices.indian": "100INR" },
      { "prices.indian": "200INR" },
      { "prices.indian": "500INR" },
    ],
  });

  res.send({ msg: fetchByBookPrice });
});

//getRandomBooks - returns books that are available in stock or have more than 500 pages
router.get("/getRandomBooks", newBookController.getRandomBooks);

//Assignment 17
//Date 17
// Books and author Schema

//1. Write down the schemas for book and authors
//--------------------------------------------------------------
router.post("/creatNewBook", authorBookController.createNewBook);

router.post("/authorCreate", authorBookController.authorCreate);

//List out the books written by "Chetan Bhagat"

router.get("/listByAuthorName", authorBookController.listOfBooks);

//find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response
router.get("/findUpdate", authorBookController.findAndUpdate);

//Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.
router.get(
  "/findBookswithAuthNames",
  authorBookController.findBookswithAuthNames
);

module.exports = router;
