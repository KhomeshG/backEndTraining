//importing Mongoose package
const mongoose = require("mongoose");

let ObjectId = mongoose.Schema.Types.ObjectId;
//Defining Order Schema

const orderSchema = mongoose.Schema({
  userId: { type: ObjectId, ref: "Newuser" },
  productId: { type: ObjectId, ref: "NewProduct" },
  amount: Number,
  isFreeAppUser: Boolean,
  date: String,
});

//Exporting Schema

module.exports = mongoose.model("Neworder", orderSchema);

//mongoose.model allow to do CRUD Operation Over the OrderSchema
