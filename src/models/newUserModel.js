//Importing mongoose
const mongoose = require("mongoose");

//defining Schema

const userSchema = mongoose.Schema(
  {
    name: String,
    balance: { type: Number, default: 100 },
    address: String,
    age: Number,
    gender: { type: String, enum: ["male", "female", "other"] },
    isFreeAppUser: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//exporting userSchema

module.exports = mongoose.model("Newuser", userSchema);
//mongoose.model allow to do CRUD operation on over userSchema

//its default create Collection name like :--newusers
