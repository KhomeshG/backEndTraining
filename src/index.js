const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const { default: mongoose } = require("mongoose");
const app = express();
const moment = require("moment");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://functionup-cohort:G0Loxqc9wFEGyEeJ@cluster0.rzotr.mongodb.net/Pritesh8769811-DB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

// app.use(function (req, res, next) {
//   console.log("inside GLOBAL MW");
//   next();
// });

//
app.use(function (req, res, next) {
  console.log("This is global MiddleWare");
  //
  let date = moment().format("YYYY-MM-DD HH:mm:ss");
  //moment is package of node.js

  let ipAddress = req.ip;
  //req.ip gives the ip address of local machine
  let urlThatAreInUse = req.originalUrl;
  //req.orignalUrl gives the url which you are hiiting
  console.log(date, ipAddress, urlThatAreInUse);
  next();
  //Next is a callBack function that do the next Operation
});

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
