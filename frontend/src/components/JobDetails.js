import React from "react";
import { useParams } from "react-router-dom";

export default function JobDetails() {
  const { id } = useParams();
  const job = {
    id,
    title: "Move Sofa",
    description: "Help move a sofa from living room to truck.",
    location: "Delhi",
    date: "2024-06-10",
    client: { name: "Amit Sharma", phone: "9876543210" },
    status: "Open",
    paymentType: "Cash",
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "32rem", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{job.title}</h1>
      <div style={{ marginBottom: "0.5rem" }}>{job.description}</div>
      <div style={{ marginBottom: "0.5rem" }}>Location: {job.location}</div>
      <div style={{ marginBottom: "0.5rem" }}>Date: {job.date}</div>
      <div style={{ marginBottom: "0.5rem" }}>Payment: {job.paymentType}</div>
      <div style={{ marginBottom: "0.5rem" }}>Status: {job.status}</div>
      <div style={{ marginBottom: "0.5rem" }}>Client: {job.client.name} ({job.client.phone})</div>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <button style={{ flex: "1", backgroundColor: "#16a34a", color: "#ffffff", padding: "0.5rem", borderRadius: "0.25rem" }}>
          Accept
        </button>
        <button style={{ flex: "1", backgroundColor: "#dc2626", color: "#ffffff", padding: "0.5rem", borderRadius: "0.25rem" }}>
          Reject
        </button>
      </div>
    </div>
  );
}