import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const styles = {
    container: {
      padding: "1rem",
      maxWidth: "37.5rem",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    title: { fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" },
    section: { marginBottom: "1.5rem" },
    sectionTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      marginBottom: "0.75rem",
    },
    jobCard: {
      padding: "0.75rem",
      backgroundColor: "#ffffff",
      borderRadius: "0.375rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      marginBottom: "0.75rem",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
    },
    jobTitle: { fontWeight: "600", marginBottom: "0.25rem" },
    jobMeta: { fontSize: "0.875rem", color: "#666" },
    chartBox: {
      padding: "1rem",
      backgroundColor: "#ffffff",
      borderRadius: "0.375rem",
      textAlign: "center",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    button: {
      padding: "0.5rem",
      backgroundColor: "#4B5EFC",
      color: "#ffffff",
      borderRadius: "0.25rem",
      textAlign: "center",
      cursor: "pointer",
      marginRight: "0.5rem",
      border: "none",
    },
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const response = await fetch("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          const filteredJobs = data.filter(
            (job) =>
              job.client?._id === userId || job.worker?._id === userId
          );
          setJobs(filteredJobs);
        } else {
          setError(data.message || "Failed to load jobs.");
        }
      } catch (err) {
        setError("Error fetching jobs.");
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Actions</h2>
        <button style={styles.button} onClick={() => navigate("/post-job")}>
          Post a Job
        </button>
        <button style={styles.button} onClick={() => navigate("/bookings")}>
          View Bookings
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>My Jobs</h2>
        {error && (
          <div style={{ color: "#dc2626", marginBottom: "0.75rem" }}>
            {error}
          </div>
        )}
        {jobs.length === 0 ? (
          <div>No jobs found.</div>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              style={styles.jobCard}
              onClick={() => navigate(`/booking/${job._id}`)}
            >
              <span style={styles.jobTitle}>{job.title}</span>
              <span style={styles.jobMeta}>
                {job.status} • {new Date(job.date).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Analytics</h2>
        <div style={styles.chartBox}>(Chart Placeholder)</div>
      </div>
    </div>
  );
}
