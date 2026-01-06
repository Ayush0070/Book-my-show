const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const { name, email, password, roles } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser };
