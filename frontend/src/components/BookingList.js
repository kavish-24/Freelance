import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const res = await fetch("http://localhost:5000/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          const filtered = data.filter(
            (job) => job.client?._id === userId || job.worker?._id === userId
          );
          setBookings(filtered);
        } else {
          setError(data.message || "Failed to load bookings");
        }
      } catch (err) {
        setError("Error fetching bookings");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "1rem", maxWidth: "32rem", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>My Bookings</h1>
      {error && <div style={{ color: "red", marginBottom: "0.5rem" }}>{error}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            style={{ padding: "1rem", backgroundColor: "#ffffff", borderRadius: "0.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
          >
            <span style={{ fontWeight: "600", fontSize: "1.125rem" }}>{booking.title}</span>
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{booking.status} • {booking.date}</span>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button
                style={{ flex: 1, backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem", borderRadius: "0.25rem" }}
                onClick={() => navigate(`/booking/${booking._id}`)}
              >
                Details
              </button>
              {booking.status === "Scheduled" && (
                <button
                  style={{ flex: 1, backgroundColor: "#dc2626", color: "#fff", padding: "0.25rem", borderRadius: "0.25rem" }}
                >
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
