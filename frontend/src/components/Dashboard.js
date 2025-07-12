import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "720px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      color: "#1f2937",
      textAlign: "center",
    },
    section: {
      marginBottom: "2rem",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      marginBottom: "1rem",
      color: "#374151",
    },
    jobCard: {
      padding: "1rem",
      backgroundColor: "#ffffff",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
      marginBottom: "1rem",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    jobCardHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    },
    jobTitle: {
      fontWeight: "600",
      marginBottom: "0.25rem",
      color: "#111827",
      fontSize: "1rem",
    },
    jobMeta: {
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    chartBox: {
      padding: "2rem",
      backgroundColor: "#ffffff",
      borderRadius: "0.5rem",
      textAlign: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      color: "#6b7280",
      fontStyle: "italic",
    },
    buttonContainer: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
    },
    button: {
      padding: "0.75rem 1.25rem",
      backgroundColor: "#4F46E5",
      color: "#ffffff",
      borderRadius: "0.375rem",
      border: "none",
      cursor: "pointer",
      fontWeight: "500",
      transition: "background-color 0.2s",
    },
    buttonHover: {
      backgroundColor: "#4338ca",
    },
    error: {
      color: "#dc2626",
      marginBottom: "0.75rem",
      backgroundColor: "#fee2e2",
      padding: "0.5rem",
      borderRadius: "0.375rem",
    },
    noJobs: {
      color: "#6b7280",
      fontStyle: "italic",
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
      <h1 style={styles.title}>My Dashboard</h1>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)
            }
            onClick={() => navigate("/post-job")}
          >
            Post a Job
          </button>
          <button
            style={styles.button}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)
            }
            onClick={() => navigate("/bookings")}
          >
            View Bookings
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>My Jobs</h2>
        {error && <div style={styles.error}>{error}</div>}
        {jobs.length === 0 ? (
          <div style={styles.noJobs}>You haven't posted or taken any jobs yet.</div>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              style={styles.jobCard}
              onMouseOver={(e) => {
                Object.assign(e.currentTarget.style, styles.jobCardHover);
              }}
              onMouseOut={(e) => {
                Object.assign(e.currentTarget.style, styles.jobCard);
              }}
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
        <div style={styles.chartBox}>Chart coming soon...</div>
      </div>
    </div>
  );
}
