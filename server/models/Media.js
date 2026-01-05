const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  driveId: { type: String, required: true },
  type: { type: String, enum: ["image", "video"], required: true },
  title: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Media", mediaSchema);
