import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  date: String,
  time: String,
  sender: String,
  senderName: String,
  text: String
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
