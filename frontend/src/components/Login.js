import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { phone, password });
const { token, user } = res.data;

localStorage.setItem("token", token);
localStorage.setItem("userId", user.id);
navigate("/landing");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <form
        onSubmit={handleSubmit}
        style={{ backgroundColor: "#ffffff", padding: "2rem", borderRadius: "0.375rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", width: "100%", maxWidth: "24rem" }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center" }}>Login</h2>
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: "#dc2626", marginBottom: "1rem" }}>{error}</div>}
        <button
          style={{ width: "100%", backgroundColor: "#3b82f6", color: "#ffffff", padding: "0.5rem", borderRadius: "0.25rem", transition: "background-color 0.2s", ...(loading ? { opacity: "0.7" } : {}) }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#3b82f6", textDecoration: "underline" }}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}