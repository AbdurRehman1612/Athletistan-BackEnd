const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  accounttype: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  dateofbirth: { type: String },
  age: { type: String },
  nic: { type: String },
  gender: { type: String },
  contactno: { type: String },
  address: { type: String },
  country: { type: String },
  city: { type: String },
  areaofinterest: { type: String },
  noofexp: { type: String },
  // images: [],
  desc: { type: String },
  dp: {
    type: String,
    default: null,
  },
  expfee: {
    type: String,
    default: null,
  },
  trainingweeks: {
    type: String,
    default: null,
  },

  startdate: {
    type: String,
    default: null,
  },
  availabledays: {
    type: [],
    default: null,
  },
  timeslots: {
    type: [],
    default: null,
  },
});

module.exports = mongoose.model("Coach", userSchema);
