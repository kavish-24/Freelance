const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String }, // Not required for OTP login
    role: { type: String, enum: ["client", "worker", "admin"], required: true },
    skills: [String],
    verified: { type: Boolean, default: false },
    reviews: [
      {
        reviewer: String,
        rating: Number,
        text: String,
        date: Date,
      },
    ],
    hourlyRate: Number,
    location: String,
    languages: [String],
    availability: [{ date: String, available: Boolean }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
