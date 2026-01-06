const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    // if(req.body.password !== existingUser.password) {
    //     return res.status(400).json({success: false, message: 'Invalid password' });
    // }
    const inMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!inMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .send({
        success: true,
        message: "User logged in successfully",
        user: existingUser,
        data: token,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { loginUser };
