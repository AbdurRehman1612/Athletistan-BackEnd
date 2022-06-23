const db = require("../models");

exports.contactus = async (req, res) => {
  const { id, name, email, phone, message } = req.body;
  try {
    const result = db.ContactUs.create({
      id: id,
      name: name,
      email: email,
      phone: phone,
      message: message,
    });
    res.status(201).json(result);
    console.log("Data has been saved");
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
