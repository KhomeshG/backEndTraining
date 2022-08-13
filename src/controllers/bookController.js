const bookSchema = require("../models/bookModel");

const addBooks = async function (req, res) {
  //Note: We Write async front of Function
  let bodyData = req.body;
  //Dont get Confuissed betwwen body-Data and book-Data
  let bookData = await bookSchema.create(bodyData);
  //Create()-->Creating User req on DB/Server
  //-----------------------------------------
  //Note:- We Write await front of Models
  res.send({ data: bookData, status: true });
};

const findAllBooks = async function (req, res) {
  //Note: We Write async front of Function
  let getBook = await bookSchema.find();
  //find()-->Finding user req on DB/Server
  res.send({ data: getBook, status: true });
  //Sending Respons to usere in JSON Formate(key:value Pair)
};

//Exporting Module
module.exports.addBooks = addBooks;
module.exports.findAllBooks = findAllBooks;
