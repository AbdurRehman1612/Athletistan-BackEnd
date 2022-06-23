const db = require("../models");

exports.defaultathletes = (req, resp) => {
  db.EvaluationForm.find({ grade: { $gt: 79 } }).then((res) => {
    resp.status(200).json(res);
  });
};

exports.findtopathletes = (req, resp) => {
  const { sportname } = req.query;
  console.log("sportname", sportname);
  db.EvaluationForm.find({ sportname: sportname, grade: { $gt: 79 } }).then(
    (res) => {
      resp.status(200).json(res);
    }
  );
};

exports.getthedetails = (req, resp) => {
  const { id } = req.query;
  console.log("id", id);
  db.EvaluationForm.find({ _id: id }).then((res) => {
    resp.status(200).json(res);
  });
};
