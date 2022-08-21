const newAuthorSchema = require("../models/newAuthorModel");
const newPublisherSchema = require("../models/newPublisherModel");
const nayiBookSchema = require("../models/nayiBookModel");

exports.createNewAuthor = async function (req, res) {
  let authorBodyData = req.body;
  let authorData = await newAuthorSchema.create(authorBodyData);
  res.send({ data: authorData });
};

exports.createNewPublisher = async function (req, res) {
  let publisherBodyData = req.body;
  let publisherData = await newPublisherSchema.create(publisherBodyData);
  res.send({ data: publisherData });
};

exports.createNayiBooks = async function (req, res) {
  let nayiBookBodyData = req.body;
  console.log(nayiBookBodyData.author);
  if (
    nayiBookBodyData.author == undefined ||
    nayiBookBodyData.publisher == undefined
  ) {
    res.send("AuthorID is Madatory");
  } else {
    let nayiBookData = await nayiBookSchema.create(nayiBookBodyData);
    res.send({ data: nayiBookData });
  }
};

exports.getBooksWithAuthorPublisher = async function (req, res) {
  let getAllBooks = await nayiBookSchema
    .find()
    .populate("author")
    .populate("publisher");

  res.send({ data: getAllBooks });
};

//5th problem is incomplete
