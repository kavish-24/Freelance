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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "0.5rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#ffffff",
          padding: "1.5rem",
          borderRadius: "0.375rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "30rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Post a Job
        </h2>

        <input
          style={inputStyle}
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          style={inputStyle}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          style={inputStyle}
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          style={inputStyle}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <div style={{ marginBottom: "0.75rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.25rem",
              fontWeight: "600",
            }}
          >
            Payment Type:
          </label>
       <select
  value={paymentType}
  onChange={(e) => setPaymentType(e.target.value)}
>
  <option value="Cash">Cash</option>      {/* ✅ Matches schema */}
  <option value="Online">Online</option>  {/* ✅ Matches schema */}
</select>

        </div>

        {error && (
          <div style={{ color: "#dc2626", marginBottom: "0.5rem" }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: "#16a34a", marginBottom: "0.5rem" }}>
            {success}
          </div>
        )}

        <button
          style={{
            width: "100%",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            padding: "0.5rem",
            borderRadius: "0.25rem",
            transition: "background-color 0.2s",
            border: "none",
          }}
          type="submit"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  marginBottom: "0.75rem",
  border: "1px solid #d1d5db",
  borderRadius: "0.25rem",
};
