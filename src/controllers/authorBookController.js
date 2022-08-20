const nBookSchema = require("../models/nBookSchema");
const authorsSchemaModel = require("../models/authorsSchemaModel");

exports.createNewBook = async function (req, res) {
  let bookBody = req.body;
  let newBookData = await nBookSchema.create(bookBody);
  res.send({ data: newBookData });
};

exports.authorCreate = async function (req, res) {
  let authorBody = req.body;
  let authorData = await authorsSchemaModel.create(authorBody);
  res.send({ data: authorData });
};

exports.listOfBooks = async function (req, res) {
  let listByAuthorName = await authorsSchemaModel
    .find({ author_name: "Chetan Bhagat" })
    .select({ author_id: 1 });
  let listOfBooks = await nBookSchema.find({ listByAuthorName });
  res.send({ data: listOfBooks });
};
