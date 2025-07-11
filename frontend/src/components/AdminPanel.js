import React from "react";

const sampleVerifications = [{ id: 1, name: "Ravi Kumar", type: "Worker", status: "Pending" }, { id: 2, name: "Sita Devi", type: "Worker", status: "Pending" }];
const sampleDisputes = [{ id: 1, job: "Move Sofa", client: "Amit Sharma", worker: "Ravi Kumar", status: "Open" }];

export default function AdminPanel() {
  return (
    <div style={{ padding: "1rem", maxWidth: "32rem", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Admin Panel</h1>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>User Verification</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {sampleVerifications.map((user) => (
            <div
              key={user.id}
              style={{ backgroundColor: "#ffffff", padding: "0.75rem", borderRadius: "0.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <span>{user.name} ({user.type})</span>
              <button style={{ backgroundColor: "#16a34a", color: "#ffffff", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem" }}>
                Verify
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>Disputes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {sampleDisputes.map((d) => (
            <div
              key={d.id}
              style={{ backgroundColor: "#ffffff", padding: "0.75rem", borderRadius: "0.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}
            >
              <span style={{ fontWeight: "600" }}>{d.job}</span>
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>Client: {d.client} | Worker: {d.worker}</span>
              <span style={{ fontSize: "0.75rem", color: "#dc2626" }}>Status: {d.status}</span>
              <button style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem", marginTop: "0.5rem" }}>
                Resolve
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}