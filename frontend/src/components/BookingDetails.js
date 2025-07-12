import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "./ChatWindow";

export default function BookingDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          const found = data.find((job) => job._id === id);
          found ? setBooking(found) : setError("Booking not found.");
        } else {
          setError("Failed to load booking.");
        }
      } catch {
        setError("Error loading booking details.");
      }
    };

    fetchJob();
  }, [id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (error) {
    return (
      <div
        style={{
          maxWidth: "720px",
          margin: "2rem auto",
          padding: "1rem",
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
          borderRadius: "0.5rem",
          textAlign: "center",
        }}
      >
        {error}
      </div>
    );
  }

  if (!booking) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>
        Loading booking details...
      </div>
    );
  }

  const InfoRow = ({ label, value }) => (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ fontWeight: 600, color: "#374151", marginBottom: "0.25rem" }}>
        {label}
      </div>
      <div style={{ color: "#4b5563" }}>{value || "N/A"}</div>
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#f9fafb",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "1.875rem",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "1.5rem",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "0.75rem",
        }}
      >
        {booking.title}
      </h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827", marginBottom: "1rem" }}>
          Booking Details
        </h2>
        <InfoRow label="Description" value={booking.description} />
        <InfoRow label="Location" value={booking.location} />
        <InfoRow label="Date" value={formatDate(booking.date)} />
        <InfoRow label="Payment Type" value={booking.paymentType} />
        <InfoRow label="Status" value={booking.status} />
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827", marginBottom: "1rem" }}>
          Parties Involved
        </h2>
        <InfoRow
          label="Client"
          value={`${booking.client?.name || "N/A"} (${booking.client?.phone || "N/A"})`}
        />
        <InfoRow
          label="Worker"
          value={`${booking.worker?.name || "Unassigned"} (${booking.worker?.phone || "N/A"})`}
        />
      </section>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={() => alert("Reschedule logic goes here.")}
          style={{
            flex: 1,
            padding: "0.75rem",
            backgroundColor: "#f59e0b",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Reschedule
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to cancel this booking?")) {
              alert("Cancel logic goes here.");
            }
          }}
          style={{
            flex: 1,
            padding: "0.75rem",
            backgroundColor: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>

      <div
        onClick={() => setShowChat((prev) => !prev)}
        style={{
          backgroundColor: "#f3f4f6",
          color: "#374151",
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          textAlign: "center",
          cursor: "pointer",
          fontWeight: "500",
        }}
      >
        {showChat ? "Hide Chat" : "Show Chat"}
      </div>

      {showChat && (
        <div style={{ marginTop: "1rem" }}>
          <ChatWindow bookingId={booking._id} />
        </div>
      )}
    </div>
  );
}
