import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "client",
    skills: "",
    hourlyRate: "",
    location: "",
    availability: "",
    lat: null,
    lng: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm({
          ...form,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => alert("Unable to fetch location")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
        availability: form.availability.split(",").map((d) => ({ date: d.trim(), available: true })),
      };
      await api.post("/auth/register", payload);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Register</h2>

        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required style={styles.input} />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required style={styles.input} />
        <input name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange} style={styles.input} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} />

        <div style={styles.radioRow}>
          <label><input type="radio" name="role" value="client" checked={form.role === "client"} onChange={handleChange} /> Client</label>
          <label><input type="radio" name="role" value="worker" checked={form.role === "worker"} onChange={handleChange} /> Worker</label>
        </div>

        {/* Address & Geolocation */}
        <input name="location" placeholder="Your Address" value={form.location} onChange={handleChange} style={styles.input} />
        <button type="button" onClick={getLocation} style={styles.locateBtn}>📍 Use My Location</button>

        {/* Worker-only fields */}
        {form.role === "worker" && (
          <>
            <input name="skills" placeholder="Skills (comma-separated)" value={form.skills} onChange={handleChange} style={styles.input} />
            <input name="hourlyRate" type="number" placeholder="Hourly Rate (₹)" value={form.hourlyRate} onChange={handleChange} style={styles.input} />
            <input name="availability" placeholder="Available Dates (comma-separated)" value={form.availability} onChange={handleChange} style={styles.input} />
          </>
        )}

        {error && <div style={styles.error}>{error}</div>}

        <button type="submit" disabled={loading} style={styles.submit}>
          {loading ? "Registering..." : "Register"}
        </button>

        <div style={styles.footer}>
          Already registered? <Link to="/login" style={styles.link}>Login</Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f3f4f6" },
  form: { background: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", width: "100%", maxWidth: "24rem" },
  title: { textAlign: "center", marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: "bold" },
  input: { width: "100%", marginBottom: "1rem", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" },
  radioRow: { display: "flex", justifyContent: "space-between", marginBottom: "1rem" },
  locateBtn: { marginBottom: "1rem", fontSize: "0.875rem", color: "#2563eb", background: "transparent", border: "none", cursor: "pointer" },
  error: { color: "#dc2626", marginBottom: "1rem" },
  submit: { width: "100%", padding: "0.5rem", backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold" },
  footer: { marginTop: "1rem", textAlign: "center", fontSize: "0.875rem" },
  link: { color: "#2563eb", textDecoration: "underline" },
};
