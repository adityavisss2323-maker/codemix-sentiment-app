const mongoose = require("mongoose");

const sentimentSchema = new mongoose.Schema(
  {
    text: String,
    sentiment: String,
    cmr: Number,
    cmrLevel: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sentiment", sentimentSchema);