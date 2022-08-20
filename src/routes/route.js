const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");
const bookController = require("../controllers/bookController");

const newAuthorSchema = require("../models/newAuthorModel");
const newPublisherSchema = require("../models/newPublisherModel");
const nayiBookSchema = require("../models/nayiBookModel");
const { find } = require("../models/newAuthorModel");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/createAuthor", authorController.createAuthor);

router.get("/getAuthorsData", authorController.getAuthorsData);

router.post("/createBook", bookController.createBook);

router.get("/getBooksData", bookController.getBooksData);

router.get(
  "/getBooksWithAuthorDetails",
  bookController.getBooksWithAuthorDetails
);

//Date 19Aug 2022
//Assignmnet 18
// Write a POST api that creates an author from the details in request body

router.post("/createNewAuthor", async function (req, res) {
  let authorBodyData = req.body;
  let authorData = await newAuthorSchema.create(authorBodyData);
  res.send({ data: authorData });
});

//Write a POST api that creates a publisher from the details in the request body

router.post("/createNewPublisher", async function (req, res) {
  let publisherBodyData = req.body;
  let publisherData = await newPublisherSchema.create(publisherBodyData);
  res.send({ data: publisherData });
});

//Write a POST api that creates a book from the details in the request body. The api takes both the author and publisher from the request body

router.post("/createNayiBooks", async function (req, res) {
  let nayiBookBodyData = req.body;
  console.log(nayiBookBodyData.author);
  if (nayiBookBodyData.author == undefined) {
    res.send("AuthorID is Madatory");
  } else {
    let nayiBookData = await nayiBookSchema.create(nayiBookBodyData);
    res.send({ data: nayiBookData });
  }
});

//Write a GET api that fetches all the books along with their author details (you have to populate for this) as well the publisher details (you have to populate for this)

router.get("/getBooksWithAuthorPublisher", async function (req, res) {
  let getAllBooks = await nayiBookSchema
    .find()
    .populate("author")
    .populate("publisher");

  res.send({ data: getAllBooks });
});

//Create a new PUT api /books and perform the following two operations
// a) Add a new boolean attribute in the book schema called isHardCover with a default false value.
// For the books published by 'Penguin' and 'HarperCollins', update this key to true.

router.get("/books", async function (req, res) {
  // let bookPutBody = req.body;
  let booksUpdate = await nayiBookSchema.find().populate("publisher");
  let A = booksUpdate.map((x) => x.publisher.name);

  //.find({ name: "Penguin" });
  res.send({ data: A });
});

module.exports = router;
