import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
];

export default function Onboarding() {
  const [role, setRole] = useState("client");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("en");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      setError("Please fill all fields.");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f9fafb", padding: "0.5rem" }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "0.375rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", width: "100%", maxWidth: "24rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>Welcome!</h2>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "600" }}>I am a:</label>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              type="button"
              style={{ flex: "1", padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #d1d5db", ...(role === "client" ? { backgroundColor: "#3b82f6", color: "#ffffff" } : { backgroundColor: "#f3f4f6" }) }}
              onClick={() => setRole("client")}
            >
              Client
            </button>
            <button
              type="button"
              style={{ flex: "1", padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #d1d5db", ...(role === "worker" ? { backgroundColor: "#3b82f6", color: "#ffffff" } : { backgroundColor: "#f3f4f6" }) }}
              onClick={() => setRole("worker")}
            >
              Worker
            </button>
          </div>
        </div>
        <input
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "600" }}>Preferred Language:</label>
          <select
            style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>
        {error && <div style={{ color: "#dc2626", marginBottom: "0.5rem" }}>{error}</div>}
        <button
          style={{ width: "100%", backgroundColor: "#16a34a", color: "#ffffff", padding: "0.5rem", borderRadius: "0.25rem", transition: "background-color 0.2s" }}
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
}