import React, { useState } from "react";

export default function ContrastToggle() {
  const [highContrast, setHighContrast] = useState(false);

  const toggleContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle("high-contrast", !highContrast);
  };

  return (
    <button
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        padding: "0.75rem",
        borderRadius: "9999px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        zIndex: "50",
        ...(highContrast ? { backgroundColor: "#000000", color: "#ffffff" } : { backgroundColor: "#fde047", color: "#000000" }),
      }}
      onClick={toggleContrast}
      aria-label="Toggle high contrast mode"
    >
      {highContrast ? "Normal" : "High Contrast"}
    </button>
  );
}