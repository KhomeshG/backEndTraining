//Asignment 13 Aug

//const { default: mongoose } = require("mongoose");

// ------------------------------------
const mongoose = require("mongoose");
// Creating Schema Validation
const bookSchema = mongoose.Schema(
  {
    //Inside of the Json file We are Wrriting Validation
    //key : Value pair
    bookName: {
      type: String,
      unique: true,
    },
    authorName: String,
    catergory: {
      type: String,
      required: true,
      enum: ["Manga", "Fantacy", "ScienceFrinction", "Thriller", "Romance"],
    },
    yera: Number,
  },
  { timestamps: true }
);

// Exporting Schema Module (Schema is Like Body like What body Contain its Stucture)

module.exports = mongoose.model("Book", bookSchema); //books
