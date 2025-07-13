import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchButton({ isActive = false }) {
  const navigate = useNavigate();

  const navButtonStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: isActive ? "#3b82f6" : "#6b7280",
    fontSize: "0.875rem",
    cursor: "pointer",
    background: "none",
    border: "none",
  };

  return (
    <button style={navButtonStyle} onClick={() => navigate("/search")}>
      SEARCH
    </button>
  );
}