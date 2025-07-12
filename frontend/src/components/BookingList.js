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

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "640px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
    },
    title: {
      fontSize: "1.75rem",
      fontWeight: "700",
      color: "#111827",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    error: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      padding: "0.75rem 1rem",
      borderRadius: "0.375rem",
      marginBottom: "1rem",
      fontWeight: "500",
      textAlign: "center",
    },
    bookingCard: {
      padding: "1rem",
      backgroundColor: "#ffffff",
      borderRadius: "0.5rem",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
      transition: "transform 0.2s",
    },
    bookingCardHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    },
    titleText: {
      fontWeight: "600",
      fontSize: "1.125rem",
      color: "#1f2937",
    },
    statusText: {
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    buttonRow: {
      display: "flex",
      gap: "0.75rem",
      marginTop: "0.75rem",
    },
    button: {
      flex: 1,
      padding: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      borderRadius: "0.375rem",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    detailsButton: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
    },
    cancelButton: {
      backgroundColor: "#ef4444",
      color: "#ffffff",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Bookings</h1>

      {error && <div style={styles.error}>{error}</div>}

      {bookings.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          No bookings found.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              style={styles.bookingCard}
              onMouseOver={(e) =>
                Object.assign(e.currentTarget.style, styles.bookingCardHover)
              }
              onMouseOut={(e) =>
                Object.assign(e.currentTarget.style, styles.bookingCard)
              }
            >
              <span style={styles.titleText}>{booking.title}</span>
              <span style={styles.statusText}>
                {booking.status} •{" "}
                {new Date(booking.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <div style={styles.buttonRow}>
                <button
                  style={{ ...styles.button, ...styles.detailsButton }}
                  onClick={() => navigate(`/booking/${booking._id}`)}
                >
                  Details
                </button>
                {booking.status === "Scheduled" && (
                  <button
                    style={{ ...styles.button, ...styles.cancelButton }}
                    onClick={() => alert("Cancel booking logic here.")}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
