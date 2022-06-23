const db = require("../models");
const bcrypt = require("bcrypt");

exports.resetpassword = async (req, res) => {
  const { oldpassword, newpassword, acctype, id } = req.body;
  console.log(`oldpassword`, oldpassword);
  console.log(`newpassword`, newpassword);
  console.log(`acctype`, acctype);
  console.log(`id`, id);

  try {
    if (acctype === "Coach") {
      const oldUser = await db.Coach.findOne({ _id: id });
      console.log(`oldUser`, oldUser);
      const hashedPassword = await bcrypt.hash(newpassword, 12);
      const matchpass = await bcrypt.compare(oldpassword, oldUser?.password);
      console.log(`matchpass`, matchpass);
      if (!matchpass) {
        return res.status(400).json({ message: "Old password does not match" });
      } else if (matchpass) {
        let result = await db.Coach.updateOne(
          {
            _id: id,
          },
          { $set: { password: hashedPassword } }
        );
        res.status(201).json(result);

        console.log(result);
        return res
          .status(201)
          .json({ message: "Password Changed Successfully!" });
      }
    } else if (acctype === "Athlete") {
      const oldUser1 = await db.Athlete.findOne({ _id: id });
      const hashedPassword = await bcrypt.hash(newpassword, 12);
      const matchpass = await bcrypt.compare(oldpassword, oldUser1?.password);
      console.log(`matchpass`, matchpass);
      if (!matchpass) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      let result = await db.Athlete.updateOne(
        {
          _id: id,
        },
        { $set: { password: hashedPassword } }
      );
      res.status(201).json(result);

      console.log(result);
    }
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateprofiledata = async (req, res) => {
  const {
    image,
    acctype,
    email,
    id,
    nic,
    name,
    dateofbirth,
    age,
    contactno,
    address,
    city,
    description,
    noofexp,
  } = req.body;

  try {
    if (acctype === "Coach") {
      db.Coach.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            dp: image,
            name: name,
            nic: nic,
            dateofbirth: dateofbirth,
            email: email,
            age: age,
            contactno: contactno,
            address: address,
            city: city,
            desc: description,
            noofexp: noofexp,
          },
        },
        { new: true }
      ).then((resp) => res.status(201).json(resp));
    } else if (acctype === "Athlete") {
      db.Athlete.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            dp: image,
            name: name,
            nic: nic,
            dateofbirth: dateofbirth,
            age: age,
            email: email,
            contactno: contactno,
            address: address,
            city: city,
            desc: description,
            noofexp: noofexp,
          },
        },
        { new: true }
      ).then((resp) => res.status(201).json(resp));
    }
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.availabilityandfee = async (req, res) => {
  const {
    id,
    acctype,
    trainingweeks,
    timeslots,
    description,
    startdate,
    availabledays,
    charges,
  } = req.body;

  console.log(`id`, id);
  console.log(`acctype`, acctype);
  console.log(`trainingmonths`, trainingweeks);
  console.log(`timeslots`, timeslots);
  console.log(`avail days`, availabledays);
  console.log(`charges`, charges);

  try {
    if (acctype === "Coach") {
      db.Coach.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            trainingweeks: trainingweeks,
            expfee: charges,
            timeslots: timeslots,
            description: description,
            startdate: startdate,
            availabledays: availabledays,
          },
        },
        { new: true }
      ).then((resp) => res.status(201).json(resp));
    }
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.reportcoach = (req, res) => {
  const {
    athleteid,
    coachname,
    coachemail,
    coachcontactno,
    complainttype,
    desc,
    incidentdate,
    incidentlocation,
    actiontotake,
  } = req.body;
  try {
    // var id = "";
    // var name = "";
    // var email;
    // var contact = "";
    db.Coach.find({ email: coachemail }).then((resp) => {
      resp.map((data) => {
        id = data._id;
        // name = data.name;
        // contact = data.contact;
      });

      const result = db.Report.create({
        athleteid: athleteid,
        coachid: id,
        coachname: coachname,
        coachemail: coachemail,
        coachcontactno: coachcontactno,
        complainttype: complainttype,
        desc: desc,
        incidentdate: incidentdate,
        incidentlocation: incidentlocation,
        actiontotake: actiontotake,
      });
      res.status(201).json(result);
      console.log("Data has been saved");
    });
    // if (name === coachname && contact === coachcontactno) {

    //   }
    //   else {
    //     res.status(500).json({ message: "Incorrect Credentials" });
    //   }
    // }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// exports.getdetails = async (req, res) => {
//   const email = req.query.email;
//   db.Athlete.find({ email: email }).then((resp) => {
//     res.status(201).json(resp[0]);
//   });
// };

exports.getathletedetails = (req, res) => {
  const { name } = req.query;
  console.log("name", name);
  db.Athlete.find({ _id: name }).then((resp) => {
    res.status(201).json(resp);
  });
};

exports.evalform = async (req, res) => {
  const {
    coachid,
    athleteid,
    coachname,
    sportname,
    grade,
    athletedetails,
    genpara,
    specpara,
    overallspara,
    remarks,
    bmi,
  } = req.body;
  try {
    const check = await db.EvaluationForm.find({
      coachid: coachid,
      athleteid: athleteid,
    });
    if (check.length > 0) {
      return res.status(400).json({
        message: "Evaluation for this athlete has already been submitted",
      });
    } else {
      const result = await db.EvaluationForm.create({
        coachid: coachid,
        coachname: coachname,
        sportname: sportname,
        grade: grade,
        athletedata: athletedetails,
        athleteid: athleteid,
        generalparameters: genpara,
        specializedparameters: specpara,
        overallspecializedparameters: overallspara,
        remarks: remarks,
        bmi: bmi,
      });
      res.status(400).json({
        message: "Evaluation has been sent successfully!",
      });
      console.log("Data has been saved");
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

exports.showathletes = (req, resp) => {
  const { coachid } = req.query;
  // const athleteslist = [];
  console.log("coachid", coachid);
  db.Trainings.find({
    coachid: coachid,
    requesttype: "direct",
    requestaccepted: false,
    deleted: false,
  }).then((res) => {
    // res.map((data) => {
    //   glist.push(data.details);
    // });
    // console.log(glist);
    resp.status(200).json(res);
  });
};

exports.showcutomizedathletes = (req, resp) => {
  const { sportname } = req.query;
  // const athleteslist = [];
  console.log("sportname", sportname);
  db.Trainings.find({
    sportname: sportname,
    requesttype: "customized",
    requestaccepted: false,
  }).then((res) => {
    resp.status(200).json(res);
    // console.log("res", res);
  });
};
exports.athletedetails = (req, resp) => {
  let det = [];
  const { id } = req.query;
  // const athleteslist = [];
  console.log("id", id);
  db.Trainings.find({
    _id: id,
  }).then((res) => {
    res.map((data) => {
      det.push(data._id);
      det.push(data.athletedesc);
      det.push(data.athletenoofexp);
      det.push(data.sportname);
      det.push(data.athletecity);
      det.push(data.trainingweeks);
      det.push(data.trainingtimeslot);
      det.push(data.athleteexpfee);
      det.push(data.trainingstartdate);
      det.push(data.extranote);
    });
    // console.log(det);
    resp.status(200).json(det);
  });
};

exports.rejectdirectreq = (req, resp) => {
  const { id, coachid } = req.body;
  console.log("id", id);
  console.log("coachid", coachid);
  db.Trainings.update(
    { _id: id },
    // { $push: { requestrejectedby: coachid } }
    {
      $set: {
        deleted: true,
      },
    }
  ).then((res) => {
    console.log(res);
  });
};
exports.acceptdirectreq = (req, resp) => {
  const { id } = req.body;
  // const athleteslist = [];
  console.log("id", id);

  db.Trainings.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        requestaccepted: true,
      },
    },
    { new: true }
  ).then((res) => {
    console.log(res);
  });
};
exports.acceptcustomizedreq = (req, resp) => {
  const { id, coachid, coachname, coachdp } = req.body;
  // const athleteslist = [];
  console.log("id", id);
  console.log("coachid", coachid);
  console.log("coachname", coachname);

  db.Trainings.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        requestaccepted: true,
        coachid: coachid,
        coachname: coachname,
        coachdp: coachdp,
      },
    },
    { new: true }
  ).then((res) => {
    console.log(res);
  });
};

exports.rejectcustomizedreq = (req, resp) => {
  const { id, coachid } = req.body;
  console.log("id", id);
  console.log("coachid", coachid);
  db.Trainings.update(
    { _id: id },
    { $push: { customizedreqrejectedby: coachid } }
  ).then((res) => {
    console.log(res);
  });
};

exports.getcoachnames = (req, resp) => {
  const { id } = req.query;
  const arr = [];
  console.log("id", id);

  db.EvaluationForm.find({ athleteid: id }).then((res) => {
    res.map((data) => {
      arr.push(data.coachname);
    });
    resp.status(200).json(arr);
    console.log(arr);
  });
};

exports.getathletenames = (req, resp) => {
  const { id } = req.query;
  const arr = [];
  console.log("id", id);

  db.Trainings.find({ coachid: id, requestaccepted: true }).then((res) => {
    // res.map((data) => {
    //   arr.push(data.athletename);
    // });
    resp.status(200).json(res);
    // console.log(arr);
  });
};

exports.getreportdata = (req, resp) => {
  const { id, coachname } = req.query;

  console.log("id", id);

  db.EvaluationForm.find({ athleteid: id, coachname: coachname }).then(
    (res) => {
      resp.status(200).json(res);
      console.log(res);
    }
  );
};
exports.getmyathletes = (req, resp) => {
  const { id } = req.query;

  console.log("id", id);

  db.Trainings.find({ coachid: id, requestaccepted: true }).then((res) => {
    resp.status(200).json(res);
  });
};

exports.getmyathletesdetails = (req, resp) => {
  const { id, athleteid } = req.query;
  const arr = [];

  db.Trainings.find({ _id: id }).then((res) => {
    res.map((data) => {
      arr.push(data.trainingtimeslot);
      arr.push(data.trainingweeks);
      arr.push(data.trainingstartdate);
      arr.push(data.trainingenddate.substring(0, 10));
    });
  });

  db.Athlete.find({ _id: athleteid }).then((res) => {
    res.map((data) => {
      arr.push(data.contactno);
      arr.push(data.address);
      arr.push(data.desc);
    });
    resp.status(200).json(arr);
  });
};

exports.postreviewforcoach = (req, resp) => {
  const { id, alldata } = req.body;

  console.log("id", id);

  console.log("alldata", alldata);

  db.EvaluationForm.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        ratingstocoach: true,
        reviewforcoach: alldata,
      },
    },
    { new: true }
  ).then((res) => {
    console.log(res);
  });
};

exports.getathleteperformance = (req, resp) => {
  const { id } = req.query;
  const arr = [];

  console.log("id", id);

  db.EvaluationForm.find({ athleteid: id }).then((res) => {
    res.map((data) => {
      arr.push(data.overallspecializedparameters);
    });

    resp.status(200).json(arr);
  });
};

exports.getcoachperformance = (req, resp) => {
  const { id } = req.query;
  const arr = [];

  console.log("id", id);

  db.Trainings.find({ coachid: id, requestaccepted: true }).then((res) => {
    //foroverall
    resp.status(200).json(res);
  });
};
exports.getcurrentathletes = (req, resp) => {
  //for current
  const { id } = req.query;

  db.Trainings.find({
    coachid: id,
    requestaccepted: true,
    trainingcompleted: false,
  }).then((res) => {
    resp.status(200).json(res);
  });
};

exports.getreviewforcoach = (req, resp) => {
  const { id } = req.query;
  const arr = [];
  db.EvaluationForm.find({
    coachid: id,
  }).then((res) => {
    res.map((dt) => {
      arr.push(dt.reviewforcoach);
    });
    resp.status(200).json(arr);
  });
};

exports.getschedule = (req, resp) => {
  const { id } = req.query;
  const arr = [];

  console.log("id", id);

  db.Trainings.find({ athleteid: id, requestaccepted: true }).then((res) => {
    resp.status(200).json(res);
  });
};

exports.getcoachschedule = (req, resp) => {
  const { id } = req.query;
  const arr = [];

  console.log("id", id);

  db.Trainings.find({ coachid: id, requestaccepted: true }).then((res) => {
    resp.status(200).json(res);
  });
};

exports.checkenddate = (req, resp) => {
  const { date } = req.body;

  console.log("date", date);

  db.Trainings.updateMany(
    { trainingenddate: { $lte: date } },
    { $set: { trainingcompleted: true } }
  ).then((res) => {
    console.log("res", res);
  });
};

exports.showdirectreqhistory = (req, resp) => {
  const { id } = req.query;

  console.log("id", id);

  db.Trainings.find({
    athleteid: id,
    requesttype: "direct",
    deleted: false,
  }).then((res) => {
    // console.log(res);
    resp.status(200).json(res);
  });
};

exports.showcustomizedreqhistory = (req, resp) => {
  const { id } = req.query;

  console.log("id", id);

  db.Trainings.find({ athleteid: id, requesttype: "customized" }).then(
    (res) => {
      resp.status(200).json(res);
    }
  );
};

exports.directreqdelete = (req, resp) => {
  const { id } = req.body;

  console.log("id", id);

  db.Trainings.deleteOne({ _id: id }).then((res) => {
    console.log("res", res);
    resp.status(200).json(res);
  });
};

exports.customizedreqdelete = (req, resp) => {
  const { id } = req.body;

  console.log("id", id);

  db.Trainings.deleteOne({ _id: id }).then((res) => {
    console.log("res", res);
    resp.status(200).json(res);
  });
};
