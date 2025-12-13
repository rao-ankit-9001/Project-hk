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
app.get("/tiptop", (req, res) => {
  res.send("hello tiptop");
});

app.get("/health", async (req, res) => {
  const checkpoints = [];

  try {
    // ✅ Step 1: Server alive
    checkpoints.push({ step: "server", status: "ok" });

    // ✅ Step 2: PORT check
    checkpoints.push({
      step: "port",
      status: process.env.PORT ? "ok" : "missing",
      detail: process.env.PORT || "default 5000"
    });

    // ✅ Step 3: Env variable check (Mongo URI)
    if (!process.env.MONGO_URI) {
      checkpoints.push({ step: "env_mongo", status: "missing", detail: "MONGO_URI not set" });
    } else {
      checkpoints.push({ step: "env_mongo", status: "ok", detail: "MONGO_URI found" });
    }

    // ✅ Step 4: Env variable check (JWT Secret)
    if (!process.env.JWT_SECRET) {
      checkpoints.push({ step: "env_jwt", status: "missing", detail: "JWT_SECRET not set" });
    } else {
      checkpoints.push({ step: "env_jwt", status: "ok", detail: "JWT_SECRET found" });
    }

    // ✅ Step 5: Mongoose connection state
    const dbState = mongoose.connection.readyState;
    let dbStatus = "unknown";
    switch (dbState) {
      case 0: dbStatus = "disconnected"; break;
      case 1: dbStatus = "connected"; break;
      case 2: dbStatus = "connecting"; break;
      case 3: dbStatus = "disconnecting"; break;
    }
    checkpoints.push({ step: "mongoose_state", status: dbStatus });

    // ✅ Step 6: Ping DB if connected
    if (dbState === 1) {
      try {
        await mongoose.connection.db.admin().ping();
        checkpoints.push({ step: "ping", status: "ok", detail: "Ping successful" });
      } catch (pingErr) {
        checkpoints.push({ step: "ping", status: "fail", detail: pingErr.message });
      }

      // ✅ Step 7: List collections
      try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        checkpoints.push({ step: "collections", status: "ok", detail: collections.map(c => c.name) });
      } catch (colErr) {
        checkpoints.push({ step: "collections", status: "fail", detail: colErr.message });
      }
    } else {
      checkpoints.push({ step: "ping", status: "skip", detail: "DB not connected" });
      checkpoints.push({ step: "collections", status: "skip", detail: "DB not connected" });
    }

    // ✅ Final response
    res.json({
      status: "ok",
      checkpoints,
      timeIST: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    });

  } catch (err) {
    checkpoints.push({ step: "catch", status: "fail", detail: err.message });
    res.status(500).json({ status: "error", checkpoints });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
