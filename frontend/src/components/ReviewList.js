import React from "react";

const sampleReviews = [
  { id: 1, reviewer: "Amit Sharma", rating: 5, text: "Great work, very punctual!" },
  { id: 2, reviewer: "Priya Singh", rating: 4, text: "Good job, but arrived a bit late." },
];

export default function ReviewList() {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h2 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>Reviews</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {sampleReviews.map((r) => (
          <div key={r.id} style={{ backgroundColor: "#ffffff", padding: "0.75rem", borderRadius: "0.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "0.25rem" }}>
              <span style={{ fontWeight: "bold", marginRight: "0.5rem" }}>{r.reviewer}</span>
              <span style={{ color: "#f59e0b" }}>{"★".repeat(r.rating)}</span>
            </div>
            <div style={{ fontSize: "0.875rem" }}>{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}