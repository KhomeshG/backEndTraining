const mongoose = require("mongoose");
//importing mongoose
const newBookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    prices: { indian: String, european: String },
    year: { type: Number, default: 2021 },
    tags: [String],
    authorName: String,
    totalPages: Number,
    stockAvailable: { type: Boolean, default: false },
  },
  { timestamps: true }
); //timestamps by default manage creation date and updation date
//Deffinig Schema validators

module.exports = mongoose.model("Newbook", newBookSchema); // (its seen like "books" this in DB)
