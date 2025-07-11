import React, { useState, useEffect } from "react";

export default function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState("");

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

  useEffect(() => {
    const fetchWorkers = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${API_BASE}/users/workers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch workers");
        }

        const data = await response.json();
        setWorkers(data);
      } catch (err) {
        console.error("Failed to fetch workers:", err.message);
        setError(err.message);

        // fallback sample
        setWorkers([
          {
            _id: "1",
            name: "Ravi Kumar",
            skills: ["Mover", "Loader"],
            rating: 4.8,
            hourlyRate: 250,
            available: true,
            verified: true,
            location: "Delhi",
          },
          {
            _id: "2",
            name: "Sita Devi",
            skills: ["Cleaner"],
            rating: 4.6,
            hourlyRate: 200,
            available: false,
            verified: true,
            location: "Delhi",
          },
        ]);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <div style={{ padding: "1rem", maxWidth: "32rem", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Nearby Workers
      </h1>

      {error && (
        <div style={{ color: "#dc2626", marginBottom: "1rem" }}>
          {error} (Showing fallback list)
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {workers.map((worker) => (
          <div
            key={worker._id || worker.id}
            style={{
              padding: "1rem",
              backgroundColor: "#ffffff",
              borderRadius: "0.25rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontWeight: "600", fontSize: "1.125rem", marginRight: "0.5rem" }}>
                {worker.name}
              </span>
              {worker.verified && (
                <span style={{ marginLeft: "0.5rem", color: "#16a34a", fontSize: "0.75rem", fontWeight: "bold" }}>
                  ✔ Verified
                </span>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.25rem" }}>
              {worker.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: "#dbeafe",
                    color: "#3b82f6",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>
              Rating: {worker.rating} ⭐
            </div>

            <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>
              Hourly Rate: ₹{worker.hourlyRate}
            </div>

            <div style={{ fontSize: "0.875rem", marginBottom: "0.25rem" }}>
              {worker.available ? (
                <span style={{ color: "#16a34a" }}>Available</span>
              ) : (
                <span style={{ color: "#dc2626" }}>Not Available</span>
              )}
            </div>

            <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
              {worker.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
