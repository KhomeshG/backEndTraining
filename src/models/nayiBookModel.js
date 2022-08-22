const mongoose = require("mongoose");

//defining Schema
const ObjectId = mongoose.Schema.Types.ObjectId;
const nayiBookSchema = new mongoose.Schema(
  {
    name: String,
    author: {
      type: String,
      type: ObjectId,
      ref: "NewAuthor",
    },
    price: Number,
    ratings: Number,
    publisher: { type: String, type: ObjectId, ref: "NewPublisher" },
    isHardCover: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NayiBooks", nayiBookSchema);
