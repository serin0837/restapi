const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

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
  geometry: GeoSchema,
  //add in geo location
});

///model
const Ninja = mongoose.model("ninja", NinjaSchema); ///ninja is name of collection of DB//mongoose going to pluralize
/// and add our Schema

module.exports = Ninja;
