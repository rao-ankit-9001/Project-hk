import { Router } from "express";
import Message from "../models/Message.js";

const router = Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "20", 10);
  const skip = (page - 1) * limit;

  const messages = await Message.find({})
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);

  const total = await Message.countDocuments();
  res.json({ page, limit, total, hasMore: page * limit < total, messages });
});

export default router;
