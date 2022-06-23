const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://dbUser:CS1812215@cluster0.yjkan.mongodb.net/authentication",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

module.exports = {
  Coach: require("./Coach"),
  Olympics: require("./Olympics"),
  Report: require("./Report"),
  Athlete: require("./Athlete"),
  Guinness: require("./Guinness"),
  EvaluationForm: require("./EvaluationForm"),
  ContactUs: require("./ContactUs"),
  Breaktherecord: require("./Breaktherecord"),
  Trainings: require("./Trainings"),
};
