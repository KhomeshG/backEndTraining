const mongoose = require("mongoose");

//Defining Schema
const newPublisherSchema = mongoose.Schema(
  {
    name: String,
    headQuarter: String,
  },
  { timestamps: true }
);

//Exporting Scheama

module.exports = mongoose.model("NewPublisher", newPublisherSchema);
