const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");   // ✅ new
require("dotenv").config();
const moment = require("moment-timezone");


const PORT = process.env.PORT || 5000;
const app = express();
const MONGB_UR = process.env.MONGO_URI;
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestIp.mw()); // ✅ attach IP middleware

// MongoDB connection
mongoose.connect(MONGB_UR);
const db = mongoose.connection;
db.on("error", (err) => console.error("MongoDB connection error", err));
db.once("open", () => console.log("MongoDB is connected"));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Activity Schema
const activitySchema = new mongoose.Schema({
  username: String,
  ip: String,
  device: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
  loginTime: String,
  logoutTime: String,
});
const Activity = mongoose.model("Activity", activitySchema);

// Login route
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    const isPasswordValid = bcryptjs.compareSync(req.body.password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid username or password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

    // Login route ke andar
let ip = req.headers["x-forwarded-for"] || req.clientIp;
if (ip === "::1") ip = "127.0.0.1"; // normalize localhost

const activity = new Activity({
  username: user.username,
  ip,
  device: req.headers["user-agent"],
  location: {
    latitude: req.body.latitude || null,
    longitude: req.body.longitude || null,
  },
  // ✅ Save IST time as Date object
  loginTime: moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss")

});

    await activity.save();

    res.status(200).json({ message: "Login successful", token, username: user.username });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout route
app.post("/logout", async (req, res) => {
  try {
    const { username } = req.body;
    await Activity.findOneAndUpdate(
      { username },
      { logoutTime: new Date() },
      { sort: { loginTime: -1 } }
    );
    res.json({ message: "Logout recorded" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Root route (optional)
app.get("/", (req, res) => {
  res.send("Hello from server");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
