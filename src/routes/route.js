const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");
const bookController = require("../controllers/bookController");

const newAuthorSchema = require("../models/newAuthorModel");
const newPublisherSchema = require("../models/newPublisherModel");
const nayiBookSchema = require("../models/nayiBookModel");
const { find } = require("../models/newAuthorModel");

const nayiBookController = require("../controllers/nayiBookController");

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

router.post("/createNewAuthor", nayiBookController.createNewAuthor);

//Write a POST api that creates a publisher from the details in the request body

router.post("/createNewPublisher", nayiBookController.createNewPublisher);

//Write a POST api that creates a book from the details in the request body. The api takes both the author and publisher from the request body

router.post("/createNayiBooks", nayiBookController.createNayiBooks);

//Write a GET api that fetches all the books along with their author details (you have to populate for this) as well the publisher details (you have to populate for this)

router.get(
  "/getBooksWithAuthorPublisher",
  nayiBookController.getBooksWithAuthorPublisher
);

//Create a new PUT api /books and perform the following two operations
// a) Add a new boolean attribute in the book schema called isHardCover with a default false value.
// For the books published by 'Penguin' and 'HarperCollins', update this key to true.

router.get("/books", async function (req, res) {
  // let bookPutBody = req.body;
  let booksUpdate = await nayiBookSchema
    .find()
    .populate("publisher")
    .select({ publisher: 1, _id: 0 })
    .updateMany();

  A = booksUpdate.filter((x) =>
    x.publisher.name == "Penguin"
      ? (x.isHardCover = true)
      : (x.isHardCover = false)
  );

  res.send({ data: A });
});

router.put("/b1", async function (req, res) {
  let put1 = req.body;
  let books = await newPublisherSchema

    .find({
      name: { $in: [put1.name, put1.name2] },
    })
    .select({ _id: 1 });
  let b4U = books.map((x) => x._id);
  console.log(b4U);
  let pId = await nayiBookSchema.updateMany(
    { publisher: { $in: [b4U] } },
    { $set: { isHardCover: put1.isHardCover } },
    { upsert: true },
    { new: true }
  );
  //in publisher and geeting 2publisher Ids
  res.send({ data: pId });
});

module.exports = router;
