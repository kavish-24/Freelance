import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "./ChatWindow";

export default function BookingDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          const found = data.find((job) => job._id === id);
          if (found) setBooking(found);
          else setError("Booking not found");
        } else {
          setError("Failed to load job");
        }
      } catch (err) {
        setError("Error loading booking details");
      }
    };
    fetchJob();
  }, [id]);

  if (error) return <div style={{ padding: "1rem", color: "red" }}>{error}</div>;
  if (!booking) return <div style={{ padding: "1rem" }}>Loading...</div>;

  return (
    <div style={{ padding: "1rem", maxWidth: "32rem", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{booking.title}</h1>
      <div style={{ marginBottom: "0.5rem" }}>{booking.description}</div>
      <div style={{ marginBottom: "0.5rem" }}>Location: {booking.location}</div>
      <div style={{ marginBottom: "0.5rem" }}>Date: {booking.date}</div>
      <div style={{ marginBottom: "0.5rem" }}>Payment: {booking.paymentType}</div>
      <div style={{ marginBottom: "0.5rem" }}>Status: {booking.status}</div>
      <div style={{ marginBottom: "0.5rem" }}>
        Client: {booking.client?.name} ({booking.client?.phone || "N/A"})
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        Worker: {booking.worker?.name || "Unassigned"} ({booking.worker?.phone || "N/A"})
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", marginBottom: "1rem" }}>
        <button style={{ flex: 1, backgroundColor: "#ca8a04", color: "#fff", padding: "0.5rem", borderRadius: "0.25rem" }}>Reschedule</button>
        <button style={{ flex: 1, backgroundColor: "#dc2626", color: "#fff", padding: "0.5rem", borderRadius: "0.25rem" }}>Cancel</button>
      </div>
      <ChatWindow bookingId={booking._id} />
    </div>
  );
}
