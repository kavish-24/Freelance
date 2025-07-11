import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const userRole = "client";
  const jobs = [
    { id: 1, title: "Move Sofa", status: "Scheduled", date: "2024-06-10" },
    { id: 2, title: "Clean Kitchen", status: "Completed", date: "2024-06-08" },
  ];
  const navigate = useNavigate();

  const styles = {
    container: { padding: "1rem", maxWidth: "37.5rem", margin: "0 auto", fontFamily: "Arial, sans-serif" },
    title: { fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" },
    section: { marginBottom: "1.5rem" },
    sectionTitle: { fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.75rem" },
    jobCard: { padding: "0.75rem", backgroundColor: "#ffffff", borderRadius: "0.375rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", marginBottom: "0.75rem", display: "flex", flexDirection: "column" },
    jobTitle: { fontWeight: "600", marginBottom: "0.25rem" },
    jobMeta: { fontSize: "0.875rem", color: "#666" },
    chartBox: { padding: "1rem", backgroundColor: "#ffffff", borderRadius: "0.375rem", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
    button: { padding: "0.5rem", backgroundColor: "#4B5EFC", color: "#ffffff", borderRadius: "0.25rem", textAlign: "center", cursor: "pointer" },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Actions</h2>
        {userRole === "client" && (
          <button style={styles.button} onClick={() => navigate("/post-job")}>
            Post a Job
          </button>
        )}
        <button style={{ ...styles.button, marginLeft: "0.5rem" }} onClick={() => navigate("/booking-list")}>
          View Bookings
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Upcoming Jobs</h2>
        {jobs.map((job) => (
          <div key={job.id} style={styles.jobCard}>
            <span style={styles.jobTitle}>{job.title}</span>
            <span style={styles.jobMeta}>{job.status} • {job.date}</span>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Analytics</h2>
        <div style={styles.chartBox}>(Chart Placeholder)</div>
      </div>
    </div>
  );
}