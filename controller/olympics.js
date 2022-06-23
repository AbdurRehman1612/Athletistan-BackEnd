const db = require("../models");

exports.sportslist = (req, resp) => {
  const list = [];
  db.Olympics.find()
    .sort({ gameid: 1 })
    .then((res) => {
      res.map((data) => {
        list.push(data.name);
      });
      resp.status(200).json(list);
    });
};

exports.guinnesscatlist = (req, resp) => {
  const glist = [];
  db.Guinness.find().then((res) => {
    res.map((data) => {
      glist.push(data.catname);
    });
    resp.status(200).json(glist);
  });
};

exports.getdata = (req, resp) => {
  db.Olympics.find()
    .sort({ gameid: 1 })
    .then((res) => {
      console.log("res", res);
      resp.status(200).json(res);
    });
};

exports.olympicsdetails = (req, resp) => {
  const { name } = req.query;
  const olist = [];
  console.log("name", name);
  db.Olympics.find({ name: name }).then((res) => {
    res.map((data) => {
      olist.push(data);
    });
    console.log(olist);
    resp.status(200).json(olist);
  });
};

exports.asia = (req, resp) => {
  const { name } = req.query;
  const asia = [];

  db.Olympics.find({ name: name }).then((res) => {
    res.map((data) => {
      asia.push(data.asia);
    });
    console.log("asia=>>>>>>>>>>", asia);
    resp.status(200).json(asia);
  });
};

exports.restoftheworld = (req, resp) => {
  const { name } = req.query;
  console.log("nameeeeeeeeeeeeee", name);
  const rotw = [];

  db.Olympics.find({ name: name }).then((res) => {
    res.map((data) => {
      rotw.push(data.restoftheworld);
    });
    console.log("ROTWWWWWWWWWWWW", rotw);
    resp.status(200).json(rotw);
  });
};
