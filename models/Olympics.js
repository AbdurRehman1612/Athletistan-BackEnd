const mongoose = require("mongoose");

const olympicsSchema = mongoose.Schema(
  {
    gameid: Number,
    name: String,
    teamgame: Boolean,
    forwomen: Boolean,
    initialtext: String,
    history: String,
    pakistanplayed: Boolean,
    asia: [],
    restoftheworld: [],
    topplayers: [
      {
        name: String,
        country: String,
        gender: String,
        rank: Number,
        age: Number,
        noofolympicsmedals: String,
        gold: Number,
        silver: Number,
        bronze: Number,
      },
    ],
  },
  { collection: "olympics" }
);

module.exports = mongoose.model("olympics", olympicsSchema);
