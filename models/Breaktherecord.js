const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: String, required: true },
  contact: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, required: true },
  recordname: { type: String, required: true },
  previousrecord: { type: String, required: true },
  starttime: { type: String, required: true },
  endtime: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: String, required: true },
});

module.exports = mongoose.model("Breaktherecord", userSchema);
