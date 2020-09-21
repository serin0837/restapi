const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create ninja Schema & model
const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  rank: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  //add in geo location
});

///model
const Ninja = mongoose.model("ninja", NinjaSchema); ///ninja is name of collection of DB//mongoose going to pluralize
/// and add our Schema

module.exports = Ninja;
