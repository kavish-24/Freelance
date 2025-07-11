const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: String,
    date: String,
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: [
        "Open",
        "Accepted",
        "Scheduled",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Open",
    },
    paymentType: { type: String, enum: ["Cash", "Online"], default: "Cash" },
    messages: [
      {
        from: String,
        text: String,
        timestamp: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
