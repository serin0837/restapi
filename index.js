const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//set up express app/// bring a lot of HTTP methods
const app = express();

//connect to mongodb
mongoose.connect("mongodb://localhost/ninjago"); ///mongoose going to create for us ninjago
///because mongoose version of the pomise is deprecated , we want to change to global promise
mongoose.Promise = global.Promise; ///overwriting

//add body parser
app.use(bodyParser.json()); ///we want to json

//initialise routes
app.use("/api", require("./routes/api")); /// use method make us use routes///add "api" so we don't have to put api all the time

//error handling middleware///use our own function
app.use(function (err, req, res, next) {
  //   console.log(err);///can check in console
  res.status(422).send({ error: err._message }); // now can see in response //also add status code
});

// listen for requests
app.listen(process.env.port || 4000, () => {
  console.log("now listening for requests");
});
