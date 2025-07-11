import React from "react";
import ReviewList from "./ReviewList";

export default function ClientProfile() {
  const client = {
    name: "Amit Sharma",
    phone: "9876543210",
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "32rem", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ width: "4rem", height: "4rem", backgroundColor: "#d1d5db", borderRadius: "9999px", marginRight: "1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>{client.name[0]}</div>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>{client.name}</div>
          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{client.phone}</div>
        </div>
      </div>
      <ReviewList />
    </div>
  );
}