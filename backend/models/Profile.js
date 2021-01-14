const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  id_user: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  raceTime: {
    type: String,
    required: true,
  },
  raceDate: {
    type: Date,
    default: Date.now,
  },
  imgUrl: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
