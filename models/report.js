const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  athleteid: { type: String, required: true },
  coachid: { type: String, default: null },
  coachname: { type: String, required: true },
  coachemail: { type: String, required: true },
  coachcontactno: { type: String, required: true },
  complainttype: { type: String, required: true },
  desc: { type: String, required: true },
  incidentdate: { type: String, required: true },
  incidentlocation: { type: String, required: true },
  actiontotake: { type: String, required: true },
});

module.exports = mongoose.model("Report", userSchema);
