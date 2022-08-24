const newBookModel = require("../models/newBookModel");

//creaBook logic
const creatBook = async function (req, res) {
  let data = req.body;
  //userInput Data will be save in data Variable
  let saveData = await newBookModel.create(data);
  res.send({ msg: saveData });
};

//booklist Logic

const bookList = async function (req, res) {
  let bookdata = await newBookModel
    .find()
    .select({ bookName: 1, authorName: 1, _id: 0 });
  //In find Fetching Only  bookName and authorName only by using select() query
  res.send({ msg: bookdata });
  //Sending respons in Json Formate
};

//Get book by year Logic

const getBooksInYear = async function (req, res) {
  let queryParamData = req.query.year;
  let BookDataYear = await newBookModel.find({ year: queryParamData });
  res.send({ msg: BookDataYear });
};

//getRandomBOOK According to condition Logic
const getRandomBooks = async function (req, res) {
  let randomBooks = await newBookModel.find({
    $or: [{ stockAvailable: true }, { totalPages: { $gt: 500 } }],
  });
  res.send({ msg: randomBooks });
};

//
exports.getParticularBooks = async function (req, res) {
  let bodyData = req.body;
  console.log(bodyData);
  // getting userInput throught bodys
  let bookData = await newBookModel.find(bodyData);
  res.send({ msg: bookData });
};

exports.getXINRBooks = async function (req, res) {
  // let fetchByBookPrice = await newBookSchema.find({
  //   "prices.indian": { $in: ["100INR","200INR", "300INR"] },
  // });
  let fetchByBookPrice = await newBookModel.find({
    $or: [
      { "prices.indian": "100INR" },
      { "prices.indian": "200INR" },
      { "prices.indian": "500INR" },
    ],
  });

  res.send({ msg: fetchByBookPrice });
};

//exporting Functions

module.exports.creatBook = creatBook;
module.exports.bookList = bookList;
module.exports.getBooksInYear = getBooksInYear;
module.exports.getRandomBooks = getRandomBooks;
