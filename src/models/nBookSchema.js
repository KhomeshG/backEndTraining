const mongoose = require("mongoose");

//Defining Schema

const newbookSchema = new mongoose.Schema(
  {
    name: String,
    author_id: { type: Number, required: true },

    price: Number,
    ratings: Number,
  },
  { timestamps: true }
);

// in Number we can Store Float value also

module.exports = mongoose.model("Nbooks", newbookSchema);
