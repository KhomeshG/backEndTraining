const nBookSchema = require("../models/nBookSchema");

const authorModule = require("../models/authorsSchemaModel");

exports.createNewBook = async function (req, res) {
  let userInput = req.body;
  //Takes user Input through Body
  let bodyData = await nBookSchema.create(userInput);
  //adds UserData in DB
  res.send({ msg: bodyData });
  //Sending response in JSON Format
};

exports.authorCreate = async function (req, res) {
  let userInput = req.body;
  //Takes user Input through Body
  let bodyData = await authorModule.create(userInput);
  //adds UserData in DB
  res.send({ msg: bodyData });
  //Sending response in JSON Format
};

exports.listOfBooks = async function (req, res) {
  let getAuthorId = await authorModule
    .find({ author_name: "Chetan Bhagat" })
    .select({ author_id: 1, _id: 0 });
  //res.send({ msg: getAuthorId });
  //WorkingFine
  let listOfBooks = await nBookSchema.find({
    author_id: getAuthorId[0].author_id,
  });
  // getAuthorId result is in array form and in find we pass Objects
  res.send({ msg: listOfBooks });
};

exports.findAndUpdate = async function (req, res) {
  let findAndUpadateResult = await nBookSchema.findOneAndUpdate(
    { name: "Two states" },
    { price: 100 },
    { new: true }
  );
  // res.send({ data: findAndUpadateResult });
  //Working Fine
  let result = await authorModule
    .find({
      author_id: findAndUpadateResult.author_id,
    })
    .select({ author_name: 1, _id: 0 });
  res.send({ msg: result, ms1: findAndUpadateResult });
};

exports.findBookswithAuthNames = async function (req, res) {
  let findBook = await nBookSchema
    .find({ price: { $gte: 50, $lte: 100 } })
    .select({ author_id: 1, _id: 0 });
  //res.send({ data: findBook });
  //Working Fine

  let selectedBooks = await authorModule
    .find({
      author_id: findBook.map((x) => x.author_id),
    })
    .select({ author_name: 1, _id: 0 });
  res.send({ data: selectedBooks });
};
