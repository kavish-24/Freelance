import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ReviewList from "./ReviewList";

export default function ClientProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const res = await fetch(`http://localhost:5000/api/users/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) setUser(data);
        else throw new Error(data.message);
      } catch (err) {
        console.error("Profile fetch error:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <p style={{ padding: "1rem" }}>Loading profile...</p>;

  return (
    <div style={{ padding: "1rem", maxWidth: "32rem", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <div
          style={{
            width: "4rem",
            height: "4rem",
            backgroundColor: "#d1d5db",
            borderRadius: "9999px",
            marginRight: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
          }}
        >
          {user.name[0]}
        </div>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>{user.name}</div>
          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{user.phone}</div>
        </div>
      </div>
      <ReviewList reviews={user.reviews || []} />
    </div>
  );
}
