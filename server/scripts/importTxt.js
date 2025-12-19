// server/scripts/importTxt.js
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Message from "../models/Message.js";

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo connected");

    // Path to your chat file
    const filePath = path.resolve(process.cwd(), "../client/src/assets/Buddhudi.txt");
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n").filter((line) => line.trim());

    const parsed = lines
      .filter((line) => line.includes(" - ") && !line.includes("Messages and calls"))
      .map((line) => {
        const match = line.match(/(\d{1,2}\/\d{1,2}\/\d{2}), (\d{1,2}:\d{2}\s[ap]m) - ([^:]+): (.+)/);
        if (!match) return null;
        const [, date, time, sender, text] = match;
        return {
          date,
          time,
          sender: sender === "Rao_ankit" ? "me" : "her",
          senderName: sender,
          text: text.trim()
        };
      })
      .filter(Boolean);

    await Message.insertMany(parsed);
    console.log(`Imported ${parsed.length} messages.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
