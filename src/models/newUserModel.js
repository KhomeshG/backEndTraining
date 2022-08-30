//importinmonggose
const mongoose = require("mongoose");

//Defining Schema

const newUserSchena = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    mobile: Number,
    emailId: String,
    password: String,
    gender: String,
    isDeleted: { type: Boolean, default: false }, //default value is false
    age: Number,
  },
  { timestames: true }
);

//exporting Schema
module.exports = mongoose.model("Newuser", newUserSchena);

//mongoose.model is Allowing us to do Crud operaion over Schema
