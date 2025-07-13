import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct named import

export default function ClientLandingPage() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState({ name: "" });
  const [searchVisible, setSearchVisible] = useState(false);
const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        // Decode token to get user ID
        const decoded = jwtDecode(token);
        const userId = decoded.id; // Ensure token payload has 'id' field

        const res = await fetch(`http://localhost:5000/api/users/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser({ name: data.name || "Guest" }); // Use name from response
        } else {
          throw new Error(data.message || "Failed to fetch user profile");
        }
      }catch (err) {
  console.error("Failed to fetch user:", err);
  setUser({ name: "Guest" });

  if (err.message === "No token found" || err.message.includes("Invalid")) {
    localStorage.removeItem("token");
    navigate("/login");
  }
}

    };

    // Fetch jobs
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setJobs(data);
        else throw new Error(data.message);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setJobs([]);
      }
    };

    fetchUser();
    fetchJobs();
  }, [navigate]);

  const containerStyle = {
    padding: "1rem",
    maxWidth: "28rem",
    margin: "0 auto",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  };

  const navBarStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-around",
    padding: "0.5rem 0",
  };

  const navButtonStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#6b7280",
    fontSize: "0.875rem",
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
  onClick={() => navigate("/profile/client/:id")}
  style={{
    width: "2rem",
    height: "2rem",
    backgroundColor: "#e5e7eb",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    border: "none",
    cursor: "pointer",
  }}
>
  {user.name ? user.name[0] : "?"}
</button>

         
        <button style={{ backgroundColor: "#dbeafe", color: "#3b82f6", borderRadius: "9999px", padding: "0.25rem 0.75rem", fontSize: "0.75rem" }}>♥ 100</button>
        {searchVisible ? (
  <input
    type="text"
    placeholder="Search jobs..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    style={{
      marginLeft: "1rem",
      padding: "0.25rem 0.5rem",
      fontSize: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.375rem",
    }}
  />
) : (
  <button
    onClick={() => setSearchVisible(true)}
    style={{ fontSize: "0.75rem", marginLeft: "1rem", color: "#3b82f6", background: "none", border: "none" }}
  >
    🔍
  </button>
)}

      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
          alt="Earth"
          style={{ width: "4rem", height: "4rem", borderRadius: "9999px", margin: "0 auto" }}
        />
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, marginTop: "0.5rem" }}>
          WELCOME, {user.name ? user.name.toUpperCase() : "LOADING..."}
        </h1>
        <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>Find help for your short-term tasks quickly and securely.</p>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "0.75rem", fontWeight: 600 }}>MY POSTED JOBS</h2>
          <button style={{ fontSize: "0.75rem", color: "#6b7280" }} onClick={() => navigate("/post-job")}>+ Post Job</button>
        </div>
        <p style={{ fontSize: "0.75rem", color: "#374151", marginBottom: "1rem" }}>Your latest job listings</p>

        <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          {jobs.length === 0 ? (
            <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>No jobs found</p>
          ) : (jobs
  .filter((job) =>
    job.title.toLowerCase().includes(searchText.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchText.toLowerCase())
  ).map((job) => (
              <div key={job._id} style={{ minWidth: "150px", backgroundColor: "white", borderRadius: "0.375rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", padding: "0.5rem" }}>
                <h3 style={{ fontSize: "0.75rem", fontWeight: 600 }}>{job.title}</h3>
                <p style={{ fontSize: "0.625rem", color: "#6b7280" }}>{job.description?.slice(0, 50)}...</p>
                <div style={{ fontSize: "0.625rem", color: "#3b82f6", fontWeight: 600, marginTop: "0.25rem" }}>{job.status} • {job.date}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}