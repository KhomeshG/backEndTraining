const express = require ('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', route);

//Connecting MangoDB
mongoose.connect("mongodb+srv://KhomeshUser-456:fttFkNqqiYu79Rgv@cluster0.aybauye.mongodb.net/test",{
    useNewUrlParser:true
})
.then(() => console.log("MongoDb Is Connected"))
.catch(err => console.log(err))


app.listen(process.env.PORT || 3001, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});
