const mongoose = require("mongoose");

const TweetsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    music: {
      type: String,
      default: "",
    },
    text: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Tweets || mongoose.model("Tweets", TweetsSchema);
