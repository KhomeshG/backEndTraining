//importing mongoose
const mongoose = require("mongoose");

//defining schema
const productSchema = mongoose.Schema(
  {
    name: String,
    category: String,
    price: { type: Number, require: true }, //mandatory property
  },
  { timestamps: true }
);

//export schema
module.exports = mongoose.model("NewProduct", productSchema);
//mongoose.model is allowing us to do Crud operations on our schema
