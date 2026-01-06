const express = require("express");
const { registerUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const userModel = require("../models/userModel");
const EmailHelper = require("../utils/emailHelper");
const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.get("/current", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    res.send({
      success: true,
      message: "Current user endpoint accessed",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Server error", error: error.message });
  }
});

const otpGenerator = function () {
  return Math.floor(100000 + Math.random() * 900000); // ranger from 100000 to 999999
};

userRouter.patch("/forgetpassword", async (req, res) => {
  console.log("forget password");
  try {
    if (req.body.email === undefined) {
      return res
        .status(401)
        .json({ status: "failure", message: "Email is required" });
    }
    const user = await userModel.findOne({ email: req.body.email });
    if (user == null) {
      return res
        .status(404)
        .json({ status: "failure", message: "User not found" });
    }
    const otp = otpGenerator(); // 123456
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();
    await EmailHelper("otp.html", user.email, { name: user.name, otp: otp });
    res
      .status(200)
      .json({ status: "success", message: "OTP sent to your email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// we didn't check the user entered OTP with the one stored in DB !
userRouter.patch("/resetpassword/:email", async (req, res) => {
  try {
    const resetDetails = req.body;
    if (!req.params.email || !resetDetails.otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }
    const user = await userModel.findOne({ email: req.params.email });
    if (user == null) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // if otp is expired
    if (Date.now() > user.otpExpiry) {
      return res
        .status(401)
        .json({ success: false, message: "OTP has expired" });
    }
    user.password = resetDetails.password;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res
      .status(200)
      .json({ status: "success", message: "Password reset successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = userRouter;
