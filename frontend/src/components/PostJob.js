import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [paymentType, setPaymentType] = useState("Cash");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description || !location || !date) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const client = localStorage.getItem("userId");

      const response = await fetch(`${API_BASE}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          location,
          date,
          client,
          paymentType,
        }),
      });

      if (response.ok) {
        setSuccess("Job posted successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to post job.");
      }
    } catch (err) {
      setError("Failed to post job. Please try again.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      padding: "1rem",
    },
    form: {
      backgroundColor: "#ffffff",
      padding: "2rem",
      borderRadius: "0.5rem",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      width: "100%",
      maxWidth: "30rem",
    },
    heading: {
      fontSize: "1.75rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      textAlign: "center",
      color: "#1f2937",
    },
    label: {
      display: "block",
      fontWeight: "600",
      marginBottom: "0.25rem",
      color: "#374151",
    },
    input: {
      width: "100%",
      padding: "0.5rem",
      marginBottom: "1rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.375rem",
      outline: "none",
      fontSize: "1rem",
    },
    select: {
      width: "100%",
      padding: "0.5rem",
      marginBottom: "1rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.375rem",
      fontSize: "1rem",
    },
    button: {
      width: "100%",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      padding: "0.75rem",
      fontWeight: "600",
      border: "none",
      borderRadius: "0.375rem",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    buttonHover: {
      backgroundColor: "#2563eb",
    },
    message: {
      marginBottom: "1rem",
      fontWeight: "500",
    },
    error: {
      color: "#dc2626",
    },
    success: {
      color: "#16a34a",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Post a Job</h2>

        <label style={styles.label}>Task Title</label>
        <input
          style={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label style={styles.label}>Description</label>
        <textarea
          style={{ ...styles.input, height: "100px", resize: "vertical" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label style={styles.label}>Location</label>
        <input
          style={styles.input}
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label style={styles.label}>Date</label>
        <input
          style={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label style={styles.label}>Payment Type</label>
        <select
          style={styles.select}
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="Online">Online</option>
        </select>

        {error && (
          <div style={{ ...styles.message, ...styles.error }}>{error}</div>
        )}
        {success && (
          <div style={{ ...styles.message, ...styles.success }}>{success}</div>
        )}

        <button type="submit" style={styles.button}>
          Post Job
        </button>
      </form>
    </div>
  );
}
