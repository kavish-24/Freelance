import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", { name, phone, email, password, role });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <form
        onSubmit={handleSubmit}
        style={{ backgroundColor: "#ffffff", padding: "2rem", borderRadius: "0.375rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", width: "100%", maxWidth: "24rem" }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center" }}>Register</h2>
        <input
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
          type="password"
          placeholder="Password (optional for OTP login)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
          <label>
            <input
              type="radio"
              value="client"
              checked={role === "client"}
              onChange={() => setRole("client")}
            />{" "}
            Client
          </label>
          <label>
            <input
              type="radio"
              value="worker"
              checked={role === "worker"}
              onChange={() => setRole("worker")}
            />{" "}
            Worker
          </label>
        </div>
        {error && <div style={{ color: "#dc2626", marginBottom: "1rem" }}>{error}</div>}
        <button
          style={{ width: "100%", backgroundColor: "#16a34a", color: "#ffffff", padding: "0.5rem", borderRadius: "0.25rem", transition: "background-color 0.2s", ...(loading ? { opacity: "0.7" } : {}) }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#3b82f6", textDecoration: "underline" }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}