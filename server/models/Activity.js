const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  username: String,
  ip: String,
  device: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
  loginTime: Date,
  logoutTime: Date,
});

module.exports = mongoose.model("Activity", activitySchema);
