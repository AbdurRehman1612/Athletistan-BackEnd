const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  coachid: { type: String, required: true },
  athleteid: { type: String, required: true },
  sportname: { type: String, required: true },
  grade: { type: Number, required: true },
  athletedata: { type: [], default: null },
  generalparameters: { type: [], default: null },
  specializedparameters: [Object],
  overallspecializedparameters: { type: [], default: null },
  remarks: { type: [], default: null },
  bmi: { type: String, default: null },
  coachname: { type: String, required: true },
  ratingstocoach: { type: Boolean, default: false },
  reviewforcoach: { type: [], default: null },
});

module.exports = mongoose.model("EvaluationForm", userSchema);
