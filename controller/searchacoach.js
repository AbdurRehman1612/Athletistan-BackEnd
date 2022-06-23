const db = require("../models");

exports.coachdetails = (req, resp) => {
  db.Coach.find().then((res) => {
    resp.status(200).json(res);
  });
};

exports.sportcoaches = (req, resp) => {
  const { sport } = req.query;
  // console.log("SN", sportsname);
  db.Coach.find({ areaofinterest: sport }).then((res) => {
    resp.status(200).json(res);
  });
};

exports.details = (req, resp) => {
  const { id } = req.query;
  db.Coach.find({ _id: id }).then((res) => {
    resp.status(200).json(res);
  });
};

exports.filter1 = (req, resp) => {
  const { cityfilters, sport } = req.query;
  db.Coach.find({ city: cityfilters, areaofinterest: sport }).then((res) => {
    resp.status(200).json(res);
  });
};
exports.filter2 = (req, resp) => {
  const { genderfilters, sport } = req.query;
  db.Coach.find({ gender: genderfilters, areaofinterest: sport }).then(
    (res) => {
      resp.status(200).json(res);
    }
  );
};
exports.filter3 = (req, resp) => {
  const { noofexpfilters, sport } = req.query;
  db.Coach.find({ noofexp: noofexpfilters, areaofinterest: sport }).then(
    (res) => {
      resp.status(200).json(res);
    }
  );
};
exports.filter4 = (req, resp) => {
  const { cityfilters, genderfilters, sport } = req.query;
  db.Coach.find({
    city: cityfilters,
    gender: genderfilters,
    areaofinterest: sport,
  }).then((res) => {
    resp.status(200).json(res);
  });
};
exports.filter5 = (req, resp) => {
  const { cityfilters, noofexpfilters, sport } = req.query;
  db.Coach.find({
    city: cityfilters,
    noofexp: noofexpfilters,
    areaofinterest: sport,
  }).then((res) => {
    resp.status(200).json(res);
  });
};
exports.filter6 = (req, resp) => {
  const { genderfilters, noofexpfilters, sport } = req.query;
  db.Coach.find({
    gender: genderfilters,
    noofexp: noofexpfilters,
    areaofinterest: sport,
  }).then((res) => {
    resp.status(200).json(res);
  });
};
exports.filter7 = (req, resp) => {
  const { genderfilters, noofexpfilters, sport } = req.query;
  db.Coach.find({
    gender: genderfilters,
    noofexp: noofexpfilters,
    areaofinterest: sport,
  }).then((res) => {
    resp.status(200).json(res);
  });
};
exports.filter8 = (req, resp) => {
  const { cityfilters } = req.query;
  db.Coach.find({
    city: cityfilters,
  }).then((res) => {
    resp.status(200).json(res);
  });
};
exports.filter9 = (req, resp) => {
  const { genderfilters } = req.query;
  db.Coach.find({
    gender: genderfilters,
  }).then((res) => {
    resp.status(200).json(res);
  });
};
exports.filter10 = (req, resp) => {
  const { noofexpfilters } = req.query;
  db.Coach.find({
    noofexp: noofexpfilters,
  }).then((res) => {
    resp.status(200).json(res);
  });
};
exports.filter11 = (req, resp) => {
  const { cityfilters, genderfilters } = req.query;
  db.Coach.find({
    city: cityfilters,
    gender: genderfilters,
  }).then((res) => {
    resp.status(200).json(res);
  });
};
exports.filter12 = (req, resp) => {
  const { cityfilters, noofexpfilters } = req.query;
  db.Coach.find({
    city: cityfilters,
    noofexp: noofexpfilters,
  }).then((res) => {
    resp.status(200).json(res);
  });
};
exports.filter13 = (req, resp) => {
  const { genderfilters, noofexpfilters } = req.query;
  db.Coach.find({
    gender: genderfilters,
    noofexp: noofexpfilters,
  }).then((res) => {
    resp.status(200).json(res);
  });
};
exports.filter14 = (req, resp) => {
  const { cityfilters, genderfilters, noofexpfilters } = req.query;
  db.Coach.find({
    city: cityfilters,
    gender: genderfilters,
    noofexp: noofexpfilters,
  }).then((res) => {
    resp.status(200).json(res);
  });
};

exports.addtraining = async (req, resp) => {
  const {
    coachid,
    coachname,
    athleteid,
    athletedp,
    coachdp,
    athletename,
    athletecity,
    athleteage,
    athletegender,
    athletedesc,
    athletenoofexp,
    sportname,
    athleteexpfee,
    trainingweeks,
    availabledays,
    trainingstartdate,
    trainingenddate,
    trainingstarttime,
    trainingendtime,
    trainingtimeslot,
    requestaccepted,
    requesttype,
    trainingcompleted,
    fee,
  } = req.body;

  console.log("trainingenddate", trainingenddate);

  try {
    var check = await db.Trainings.find({
      coachid: coachid,
      athleteid: athleteid,
    });

    if (check.length > 0) {
      return resp.status(400).json({
        message: "Request already sent to this coach.",
      });
    } else {
      await db.Trainings.create({
        coachid: coachid,
        coachname: coachname,
        athleteid: athleteid,
        athletedp: athletedp,
        coachdp: coachdp,
        athletename: athletename,
        athletecity: athletecity,
        athleteage: athleteage,
        athletegender: athletegender,
        athletedesc: athletedesc,
        athletecity: athletecity,
        athletenoofexp: athletenoofexp,
        sportname: sportname,
        athleteexpfee: athleteexpfee,
        trainingweeks: trainingweeks,
        availabledays: availabledays,
        trainingstartdate: trainingstartdate,
        trainingenddate: trainingenddate,
        trainingstarttime: trainingstarttime,
        trainingendtime: trainingendtime,
        trainingtimeslot: trainingtimeslot,
        requestaccepted: requestaccepted,
        requesttype: requesttype,
        trainingcompleted: trainingcompleted,
        fee: fee,
      });
      return resp.status(400).json({
        message: "Request has been sent successfully.",
      });
      console.log("Data has been saved");
    }
  } catch (error) {
    resp.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

exports.addcustomizedtraining = async (req, resp) => {
  const {
    coachid,
    coachname,
    athleteid,
    athletedp,
    athletename,
    athletecity,
    athleteage,
    athletegender,
    athletedesc,
    athletenoofexp,
    sportname,
    athleteexpfee,
    trainingweeks,
    availabledays,
    trainingstartdate,
    trainingenddate,
    trainingstarttime,
    trainingendtime,
    trainingtimeslot,
    requestaccepted,
    requesttype,
    trainingcompleted,
    extranote,
    date,
    coachdp,
    fee,
  } = req.body;

  console.log("date", date);

  try {
    var check = await db.Trainings.find({
      trainingtimeslot: trainingtimeslot,
      athleteid: athleteid,
      requestaccepted: true,
    });

    var check1 = await db.Trainings.find({
      athleteid: athleteid,
      sportname: sportname,
      athletecity: athletecity,
      trainingweeks: trainingweeks,
      trainingtimeslot: trainingtimeslot,
      athleteexpfee: athleteexpfee,
      trainingstartdate: trainingstartdate,
      extranote: extranote,
      requesttype: requesttype,
      requestaccepted: false,
    });
    var check2 = trainingstartdate <= date;

    if (check2) {
      return resp.status(400).json({
        message: "Invalid training start date.",
      });
    }
    if (check1.length > 0) {
      return resp.status(400).json({
        message:
          "You have already send a request with same credentials. Kindly wait for the approval.",
      });
    }

    if (check.length > 0) {
      return resp.status(400).json({
        message:
          "You are already on training during these timeslots. Kindly choose other timeslot to proceed.",
      });
    } else {
      await db.Trainings.create({
        coachid: coachid,
        coachname: coachname,
        athleteid: athleteid,
        athletedp: athletedp,
        athletename: athletename,
        athletecity: athletecity,
        athleteage: athleteage,
        athletegender: athletegender,
        athletedesc: athletedesc,
        athletecity: athletecity,
        athletenoofexp: athletenoofexp,
        sportname: sportname,
        athleteexpfee: athleteexpfee,
        trainingweeks: trainingweeks,
        availabledays: availabledays,
        trainingstartdate: trainingstartdate,
        trainingenddate: trainingenddate,
        extranote: extranote,
        coachdp: coachdp,
        trainingstarttime: trainingstarttime,
        trainingendtime: trainingendtime,
        trainingtimeslot: trainingtimeslot,
        requestaccepted: requestaccepted,
        requesttype: requesttype,
        trainingcompleted: trainingcompleted,
        fee: fee,
      });
      return resp.status(400).json({
        message: "Request has been sent successfully.",
      });
    }
  } catch (error) {
    resp.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
