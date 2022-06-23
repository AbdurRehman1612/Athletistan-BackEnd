const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  coachid: { type: String, default: null },
  coachname: { type: String, default: null },
  athleteid: { type: String, required: true },
  athletedp: { type: String, required: true },
  coachdp: { type: String },
  athletename: { type: String, required: true },
  athleteage: { type: String, required: true },
  athletegender: { type: String, required: true },
  athletedesc: { type: String, required: true },
  athletecity: { type: String, required: true },
  athletenoofexp: { type: String, required: true },
  sportname: { type: String, required: true },
  athleteexpfee: { type: String, default: null },
  trainingweeks: { type: String, required: true },
  availabledays: { type: [], required: true },
  trainingstartdate: { type: String, default: null },
  trainingenddate: { type: String, default: null },
  trainingstarttime: { type: String, default: null },
  trainingendtime: { type: String, default: null },
  trainingtimeslot: { type: String, default: null },
  requestaccepted: { type: Boolean, default: false },
  requesttype: { type: String, required: true },
  trainingcompleted: { type: Boolean, default: false },
  extranote: { type: String },
  requestrejectedby: { type: [], default: null },
  fee: { type: String },
  deleted: { type: Boolean, default: false },
  customizedreqrejectedby: { type: [], default: null },
});

module.exports = mongoose.model("Trainings", userSchema);
