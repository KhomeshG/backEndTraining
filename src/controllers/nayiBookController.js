const newAuthorSchema = require("../models/newAuthorModel");
const newPublisherSchema = require("../models/newPublisherModel");
const nayiBookSchema = require("../models/nayiBookModel");
const newAuthorModel = require("../models/newAuthorModel");

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

  //
  let checkedAuthorId = await newAuthorSchema.findById(nayiBookBodyData.author);
  let checkedPublisherId = await newPublisherSchema.findById(
    nayiBookBodyData.publisher
  );
  // console.log(checkedAuthorId, checkedPublisherId);
  //res.send({ data: checkedAuthorId, data1: checkedPublisherId });

  //if user dont write antthing on author section the value of author become undefined
  if (nayiBookBodyData.author == undefined) {
    res.send("AuthorID is Madatory");
  } else if (nayiBookBodyData.publisher == undefined) {
    res.send("Publisher ID is Madatory");
  } else {
    //findByid return Null if the value is not found
    //and null gives falsy value
    if (!checkedAuthorId) {
      res.send("AuthorId is Not Matched");
    } else if (!checkedPublisherId) {
      res.send("Publisher-ID is Not Matched");
    } else {
      let nayiBookData = await nayiBookSchema.create(nayiBookBodyData);
      res.send({ data: nayiBookData });
    }
  }
};

//
exports.getBooksWithAuthorPublisher = async function (req, res) {
  let getAllBooks = await nayiBookSchema
    .find()
    .populate("author")
    .populate("publisher");

  res.send({ data: getAllBooks });
};

//Now 5th problem is complete

exports.books = async function (req, res) {
  let putReq = req.body;
  let publisherId = await newPublisherSchema
    .find({
      name: { $in: [putReq.name, putReq.name1] },
    })
    .select({ _id: 1 });
  let bookUpdate = await nayiBookSchema.updateMany(
    { publisher: publisherId },
    { $set: { isHardCover: putReq.isHardCover }, new: true },
    { upsert: true }
  );

  //b) For the books written by authors having a rating greater than 3.5, update the books price by 10 (For eg if old price for such a book is 50, new will be 60)

  let authorId = await newAuthorSchema
    .find({ rating: { $gt: 3.5 } })
    .select({ _id: 1 });
  let updateBooksByIds = await nayiBookSchema.updateMany(
    { author: authorId },
    { $inc: { price: +10 } },
    { new: true }
  );

  res.send({ data: bookUpdate, data1: updateBooksByIds });
};
