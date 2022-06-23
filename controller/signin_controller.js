const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const db = require("../models");

const secret = "test";

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await db.Coach.findOne({ email });
    const oldUser1 = await db.Athlete.findOne({ email });

    if (oldUser === null && oldUser1 === null) {
      return res.status(400).json({ message: "Email not found" });
    }

    if (oldUser !== null) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        oldUser?.password
      );

      if (isPasswordCorrect) {
        const token = jwt.sign(
          { email: oldUser.email, id: oldUser._id },
          secret,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ result: oldUser, token });
      } else {
        return res.status(400).json({ message: "Password is incorrect" });
      }
    } else {
      const isPasswordCorrect1 = await bcrypt.compare(
        password,
        oldUser1?.password
      );

      if (isPasswordCorrect1) {
        const token = jwt.sign(
          { email: oldUser1.email, id: oldUser1._id },
          secret,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ result: oldUser1, token });
      } else {
        return res.status(400).json({ message: "Password is not correct" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
};

exports.forgotpassword = async (req, res) => {
  const { email } = req.body.form;
  console.log("email", email);
  try {
    const user = await db.Coach.findOne({ email });
    const user1 = await db.Athlete.findOne({ email });

    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        `secret${user.password}`,
        {
          expiresIn: 60 * 6,
        }
      );
      const url = `${req.headers.origin}/forgetpassword/${user._id}/${token}`;
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
        subject: "password reset",
        html: `<a href="${url}">${url}</a>`,
      };
      await transporter.sendMail(mailOptions);
      return res
        .status(200)
        .json({ message: "Password reset link has been sent to your email." });
    } else if (user1) {
      const token = jwt.sign(
        {
          id: user1._id,
        },
        `secret${user1.password}`,
        {
          expiresIn: 60 * 6,
        }
      );
      const url = `${req.headers.origin}/forgetpassword/${user1._id}/${token}`;
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
        subject: "password reset",
        html: `<a href="${url}">${url}</a>`,
      };
      await transporter.sendMail(mailOptions);
      return res
        .status(200)
        .json({ message: "Password reset link has been sent to your email." });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(`error`, error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.verifyToken = async (req, res) => {
  const { id, token } = req.body;
  const user = await db.Coach.findOne({ _id: id });
  const user1 = await db.Athlete.findOne({ _id: id });

  if (!user && !user1) {
    return res.status(404).json({ message: "Invalid User ID" });
  }

  try {
    if (user) {
      const decodedTokenData = jwt.verify(token, `secret${user.password}`);
      if (decodedTokenData) {
        return res.status(200).json({ message: "Token verified" });
      }
      return res.status(401).json({ message: "Something went wrong." });
    }

    if (user1) {
      const decodedTokenData = jwt.verify(token, `secret${user1.password}`);
      if (decodedTokenData) {
        return res.status(200).json({ message: "Token verified" });
      }
      return res.status(401).json({ message: "Something went wrong." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { id, newpass } = req.body.form;
  try {
    const salt = await bcrypt.genSalt(12);
    const newpassword = await bcrypt.hash(newpass, salt);

    await db.Coach.findOneAndUpdate({ _id: id }, { password: newpassword });
    await db.Athlete.findOneAndUpdate({ _id: id }, { password: newpassword });
    return res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.Coachsignup = async (req, res) => {
  const {
    accounttype,
    email,
    password,
    firstName,
    nic,
    lastName,
    dateofbirth,
    age,
    gender,
    contactno,
    address,
    country,
    city,
    areaofinterest,
    noofexp,
    desc,
  } = req.body;

  try {
    const oldUser = await db.Coach.findOne({ email });
    const oldUser1 = await db.Athlete.findOne({ email });

    if (!oldUser && oldUser1)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.Coach.create({
      accounttype: accounttype,
      email: email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      dateofbirth: dateofbirth,
      nic: nic,
      age: age,
      gender: gender,
      contactno: contactno,
      address: address,
      country: country,
      city: city,
      desc: desc,
      areaofinterest: areaofinterest,
      noofexp: noofexp,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
    console.log("Data has been saved");
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

exports.Athletesignup = async (req, res) => {
  const {
    accounttype,
    email,
    password,
    firstName,
    nic,
    lastName,
    dateofbirth,
    age,
    gender,
    contactno,
    address,
    country,
    city,
    areaofinterestolympics,
    areaofinterestguinness,
    noofexp,
    desc,
  } = req.body;

  try {
    const oldUser = await db.Coach.findOne({ email });
    const oldUser1 = await db.Athlete.findOne({ email });

    if (!oldUser && oldUser1)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.Athlete.create({
      accounttype: accounttype,
      email: email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      dateofbirth: dateofbirth,
      nic: nic,
      age: age,
      gender: gender,
      contactno: contactno,
      address: address,
      country: country,
      city: city,
      desc: desc,
      areaofinterestolympics: areaofinterestolympics,
      areaofinterestguinness: areaofinterestguinness,
      noofexp: noofexp,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
    console.log("Data has been saved");
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
