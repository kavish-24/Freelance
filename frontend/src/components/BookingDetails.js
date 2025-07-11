import React from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "./ChatWindow";

export default function BookingDetails() {
  const { id } = useParams();
  const booking = {
    id,
    title: "Move Sofa",
    description: "Help move a sofa from living room to truck.",
    location: "Delhi",
    date: "2024-06-10",
    status: "Scheduled",
    paymentType: "Cash",
    client: { name: "Amit Sharma", phone: "9876543210" },
    worker: { name: "Ravi Kumar", phone: "9123456789" },
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "32rem", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{booking.title}</h1>
      <div style={{ marginBottom: "0.5rem" }}>{booking.description}</div>
      <div style={{ marginBottom: "0.5rem" }}>Location: {booking.location}</div>
      <div style={{ marginBottom: "0.5rem" }}>Date: {booking.date}</div>
      <div style={{ marginBottom: "0.5rem" }}>Payment: {booking.paymentType}</div>
      <div style={{ marginBottom: "0.5rem" }}>Status: {booking.status}</div>
      <div style={{ marginBottom: "0.5rem" }}>Client: {booking.client.name} ({booking.client.phone})</div>
      <div style={{ marginBottom: "0.5rem" }}>Worker: {booking.worker.name} ({booking.worker.phone})</div>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", marginBottom: "1rem" }}>
        <button style={{ flex: "1", backgroundColor: "#ca8a04", color: "#ffffff", padding: "0.5rem", borderRadius: "0.25rem" }}>Reschedule</button>
        <button style={{ flex: "1", backgroundColor: "#dc2626", color: "#ffffff", padding: "0.5rem", borderRadius: "0.25rem" }}>Cancel</button>
      </div>
      <ChatWindow bookingId={booking.id} />
    </div>
  );
}