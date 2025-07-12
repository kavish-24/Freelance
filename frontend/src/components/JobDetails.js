import React from "react";
import { useParams } from "react-router-dom";

export default function JobDetails() {
  const { id } = useParams();

  // Dummy job object (replace with API fetch in real use)
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

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "700px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
    },
    title: {
      fontSize: "1.75rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "1rem",
    },
    label: {
      fontWeight: "600",
      color: "#374151",
    },
    value: {
      color: "#4b5563",
      marginBottom: "0.5rem",
    },
    infoRow: {
      marginBottom: "0.75rem",
    },
    buttonRow: {
      display: "flex",
      gap: "0.75rem",
      marginTop: "1.5rem",
    },
    button: {
      flex: 1,
      padding: "0.75rem",
      borderRadius: "0.375rem",
      border: "none",
      fontWeight: "600",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    accept: {
      backgroundColor: "#16a34a",
    },
    reject: {
      backgroundColor: "#dc2626",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{job.title}</h1>

      <div style={styles.infoRow}>
        <div style={styles.label}>Description:</div>
        <div style={styles.value}>{job.description}</div>
      </div>

      <div style={styles.infoRow}>
        <div style={styles.label}>Location:</div>
        <div style={styles.value}>{job.location}</div>
      </div>

      <div style={styles.infoRow}>
        <div style={styles.label}>Date:</div>
        <div style={styles.value}>
          {new Date(job.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div style={styles.infoRow}>
        <div style={styles.label}>Payment:</div>
        <div style={styles.value}>{job.paymentType}</div>
      </div>

      <div style={styles.infoRow}>
        <div style={styles.label}>Status:</div>
        <div style={styles.value}>{job.status}</div>
      </div>

      <div style={styles.infoRow}>
        <div style={styles.label}>Client:</div>
        <div style={styles.value}>
          {job.client.name} ({job.client.phone})
        </div>
      </div>

      <div style={styles.buttonRow}>
        <button
          style={{ ...styles.button, ...styles.accept }}
          onClick={() => alert("Accepted!")}
        >
          Accept
        </button>
        <button
          style={{ ...styles.button, ...styles.reject }}
          onClick={() => alert("Rejected!")}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
