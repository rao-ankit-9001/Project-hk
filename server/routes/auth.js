const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Activity = require("../models/Activity");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "superSecretKey";

// ✅ Login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    const isPasswordValid = bcryptjs.compareSync(req.body.password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid username or password" });

    // Capture info
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const device = req.headers["user-agent"];

    const activity = new Activity({
      username: user.username,
      ip,
      device,
      location: {
        latitude: req.body.latitude || null,
        longitude: req.body.longitude || null,
      },
      loginTime: new Date(),
    });
    await activity.save();

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Logout route
router.post("/logout", async (req, res) => {
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

module.exports = router;
