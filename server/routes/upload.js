const express = require("express");
const multer = require("multer");
const fs = require("fs");
const File = require("../models/File");

const router = express.Router();

// multer setup (store file in /uploads temporarily)
const upload = multer({ dest: "uploads/" });

// ✅ POST route for file upload
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // read file content
    const fileContent = fs.readFileSync(req.file.path, "utf-8");

    // save to DB
    const newFile = new File({
      filename: req.file.originalname,
      content: fileContent
    });
    await newFile.save();

    res.json({ message: "File uploaded & saved to DB successfully!", fileId: newFile._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET route to fetch all messages (optimized: filter on server)
router.get("/messages", async (req, res) => {
  try {
    // get latest file
    const file = await File.findOne().sort({ uploadedAt: -1 });
    if (!file) {
      return res.status(404).json({ error: "No file found" });
    }

    // split content into lines
    const lines = file.content.split("\n").filter(line => line.trim());

    // filter valid messages
    const messages = lines.filter(line => line.includes(" - ") && !line.includes("Messages and calls"));

    res.json({
      filename: file.filename,
      total: messages.length,
      messages: messages
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET route to fetch all uploaded files list
router.get("/files", async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
