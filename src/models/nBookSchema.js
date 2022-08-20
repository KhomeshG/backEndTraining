const mongoose = require("mongoose");

//Defining Schema

const nBookSchema = mongoose.Schema(
  {
    name: String,
    author_id: { type: Number, require: true },
    price: Number,
    ratings: Number,
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Nbooks", nBookSchema);
