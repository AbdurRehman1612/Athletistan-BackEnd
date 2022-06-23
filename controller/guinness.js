const db = require("../models");
const nodemailer = require("nodemailer");

exports.getdata = (req, resp) => {
  db.Guinness.find()
    .sort({ catid: 1 })
    .then((res) => {
      console.log("res", res);
      resp.status(200).json(res);
    });
};

exports.guinnesscatlist = (req, resp) => {
  const glist = [];
  db.Guinness.find()
    .sort({ catid: 1 })
    .then((res) => {
      res.map((data) => {
        glist.push(data.catname);
      });
      resp.status(200).json(glist);
    });
};

exports.getheaderimages = (req, resp) => {
  const { catname } = req.query;
  console.log("catname", catname);
  db.Guinness.find({ catname: catname }).then((res) => {
    resp.status(200).json(res);
  });
};

exports.recorddetails = (req, resp) => {
  const { who } = req.query;
  const glist = [];
  console.log("who", who);
  db.Guinness.find({ details: { $elemMatch: { who: who } } }).then((res) => {
    res.map((data) => {
      glist.push(data.details);
    });
    console.log(glist);
    resp.status(200).json(glist);
  });
};

// exports.relatedrecords = (req, resp) => {
//   const { who } = req.query;
//   const glist = [];
//   console.log("who", who);
//   db.Guinness.find({details:{$ne:who} }).then((res) => {
//     res.map((data) => {
//       glist.push(data.details);
//     });
//     console.log(glist);
//     resp.status(200).json(glist);
//   });
// };

exports.breaktherecorddetails = async (req, res) => {
  const {
    name,
    email,
    age,
    contact,
    country,
    city,
    address,
    category,
    recordname,
    prevrecord,
    stime,
    etime,
    desc,
    video,
  } = req.body;
  try {
    const result = await db.Breaktherecord.create({
      name: name,
      email: email,
      age: age,
      contact: contact,
      country: country,
      city: city,
      address: address,
      category: category,
      recordname: recordname,
      previousrecord: prevrecord,
      starttime: stime,
      endtime: etime,
      description: desc,
      video: video,
    });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "cs1812215@szabist.pk",
        pass: "CS1812215",
      },
    });

    const mailOptions = {
      from: "cs1812215@szabist.pk",
      to: email,
      subject: "Athletistan Guinness Application Confirmation",
      html: `<p>Thank you ${name} for sharing your details with Athletistan. We have received your details from guinness break the record section. We will get back to you shortly.</p>`,
    };
    await transporter.sendMail(mailOptions);
    return res.status(201).json({ message: "Data has been saved" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
