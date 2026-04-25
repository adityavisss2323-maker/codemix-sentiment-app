const express = require("express");
const router = express.Router();
const Sentiment = require("../models/Sentiment");

const positiveWords = ["good", "best", "mast", "awesome", "nice", "great", "love", "acha", "badhiya"];
const negativeWords = ["bad", "worst", "boring", "hate", "poor", "sad", "bekar", "ganda"];

function analyze(text) {
  const words = text.toLowerCase().split(/\s+/);
  let pos = 0;
  let neg = 0;

  words.forEach((word) => {
    if (positiveWords.includes(word)) pos++;
    if (negativeWords.includes(word)) neg++;
  });

  if (pos > neg) return "Positive";
  if (neg > pos) return "Negative";
  return "Neutral";
}

function getCMR(text) {
  const words = text.trim().split(/\s+/);
  const englishWords = words.filter((word) => /^[a-zA-Z]+$/.test(word));
  const cmr = englishWords.length / words.length;

  let level = "Low";
  if (cmr > 0.66) level = "High";
  else if (cmr > 0.33) level = "Medium";

  return {
    cmr: Number(cmr.toFixed(2)),
    level,
  };
}

router.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const sentiment = analyze(text);
    const { cmr, level } = getCMR(text);

    const data = await Sentiment.create({
      text,
      sentiment,
      cmr,
      cmrLevel: level,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/history", async (req, res) => {
  const data = await Sentiment.find().sort({ createdAt: -1 });
  res.json(data);
});

router.get("/dashboard", async (req, res) => {
  const positive = await Sentiment.countDocuments({ sentiment: "Positive" });
  const negative = await Sentiment.countDocuments({ sentiment: "Negative" });
  const neutral = await Sentiment.countDocuments({ sentiment: "Neutral" });

  res.json({ positive, negative, neutral });
});

module.exports = router;