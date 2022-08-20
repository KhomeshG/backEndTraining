const mongoose = require("mongoose");

//Defining Schema

const authorSchema = mongoose.Schema(
  {
    author_id: { type: Number, require: true },

    author_name: String,
    age: Number,
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Authors", authorSchema);
