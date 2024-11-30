const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
router.use(bodyparser.json());
const Signup = require("../Models/SignupSchema");
const nodemailer = require("nodemailer");
const { jwtAuthMiddleware, generateToken } = require("../JWT");

router.post("/api/signup", async (req, res) => {
  try {
    let otp = Math.floor(1000 + Math.random() * 9000 + 1);
    const data = req.body;
    let obj = {
      userName: data.userName,
      email: data.email,
      dob: data.dob,
      otp: otp,
    };
    const newData = await Signup(obj);
    const response = await newData.save();

    const payload = {
      id: response.id,
    };

    // const token = generateToken(payload);
    res.status(200).json({ response: response });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "againnnn94@gmail.com",
        pass: "qdbq cguj rcfl tosq",
      },
    });

    const mailOptions = {
      from: "againnnn94@gmail.com",
      to: data.email,
      subject: "OTP for Note Talking Application",
      text: `Your OTP is : ${otp} `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    // setTimeout(async () => {
    //   await Signup.deleteOne({otp:otp});
    //   console.log("OTP Expire");
    // }, 60000);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
