const mongoose = require("mongoose");

const guinnessSchema = mongoose.Schema(
  {
    catid: Number,
    catname: String,
    initialtext: String,
    headerimage: Array,
    details: [
      {
        rname: String,
        rimage: String,
        who: String,
        what: String,
        where: String,
        when: Number,
        desc: String,
      },
    ],
  },
  { collection: "guinness" }
);

module.exports = mongoose.model("guinness", guinnessSchema);
