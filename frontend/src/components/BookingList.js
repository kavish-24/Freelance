import React from "react";
import { useNavigate } from "react-router-dom";

const sampleBookings = [
  { id: 1, title: "Move Sofa", status: "Scheduled", date: "2024-06-10", role: "client" },
  { id: 2, title: "Clean Kitchen", status: "Completed", date: "2024-06-08", role: "worker" },
];

export default function BookingList() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "1rem", maxWidth: "32rem", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>My Bookings</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {sampleBookings.map((booking) => (
          <div
            key={booking.id}
            style={{ padding: "1rem", backgroundColor: "#ffffff", borderRadius: "0.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}
          >
            <span style={{ fontWeight: "600", fontSize: "1.125rem" }}>{booking.title}</span>
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{booking.status} • {booking.date}</span>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button
                style={{ flex: "1", backgroundColor: "#3b82f6", color: "#ffffff", padding: "0.25rem", borderRadius: "0.25rem" }}
                onClick={() => navigate(`/booking/${booking.id}`)}
              >
                Details
              </button>
              {booking.status === "Scheduled" && (
                <button style={{ flex: "1", backgroundColor: "#dc2626", color: "#ffffff", padding: "0.25rem", borderRadius: "0.25rem" }}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}