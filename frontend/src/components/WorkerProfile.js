import React from "react";
import ReviewList from "./ReviewList";

export default function WorkerProfile() {
  const worker = {
    name: "Ravi Kumar",
    verified: true,
    skills: ["Mover", "Loader"],
    hourlyRate: 250,
    available: true,
    location: "Delhi",
    photo: "",
    jobHistory: [{ id: 1, title: "Move Sofa", date: "2024-06-10" }, { id: 2, title: "Load Truck", date: "2024-06-05" }],
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "32rem", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ width: "4rem", height: "4rem", backgroundColor: "#d1d5db", borderRadius: "9999px", marginRight: "1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>{worker.name[0]}</div>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>{worker.name}</div>
          {worker.verified && <span style={{ color: "#16a34a", fontSize: "0.75rem", fontWeight: "bold" }}>✔ Verified</span>}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
        {worker.skills.map((skill) => (
          <span key={skill} style={{ backgroundColor: "#dbeafe", color: "#3b82f6", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem" }}>{skill}</span>
        ))}
      </div>
      <div style={{ marginBottom: "0.5rem" }}>Hourly Rate: ₹{worker.hourlyRate}</div>
      <div style={{ marginBottom: "0.5rem" }}>{worker.available ? <span style={{ color: "#16a34a" }}>Available</span> : <span style={{ color: "#dc2626" }}>Not Available</span>}</div>
      <div style={{ marginBottom: "0.5rem", fontSize: "0.75rem", color: "#9ca3af" }}>{worker.location}</div>
      <div style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.25rem" }}>Job History</h2>
        <ul style={{ paddingLeft: "1.25rem", listStyleType: "disc" }}>
          {worker.jobHistory.map((j) => (
            <li key={j.id}>{j.title} ({j.date})</li>
          ))}
        </ul>
      </div>
      <ReviewList />
    </div>
  );
}