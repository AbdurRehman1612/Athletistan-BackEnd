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
  Report: require("./report"),
  Athlete: require("./Athlete"),
  Guinness: require("./Guinness"),
  EvaluationForm: require("./evaluationform"),
  ContactUs: require("./contactus"),
  Breaktherecord: require("./Breaktherecord"),
  Trainings: require("./trainings"),
};
