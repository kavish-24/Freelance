const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;


exports.register = async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;
    if (!name || !phone || !role)
      return res.status(400).json({ message: "Missing required fields" });
    let user = await User.findOne({ phone });
    if (user) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    user = new User({ name, phone, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (!user.password)
      return res
        .status(400)
        .json({ message: "Password login not enabled for this user" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.otpLogin = async (req, res) => {
  // Placeholder for OTP login logic
  res.json({ message: "OTP login not implemented yet" });
};
