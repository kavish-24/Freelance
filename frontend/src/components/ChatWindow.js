import React, { useState } from "react";

export default function ChatWindow({ bookingId }) {
  const [messages, setMessages] = useState([
    { from: "client", text: "Hi, are you available?" },
    { from: "worker", text: "Yes, I am!" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "client", text: input }]);
    setInput("");
  };

  return (
    <div style={{ backgroundColor: "#f3f4f6", borderRadius: "0.5rem", padding: "0.5rem", marginTop: "1rem" }}>
      <div style={{ height: "10rem", overflowY: "auto", marginBottom: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              fontSize: "0.875rem",
              padding: "0.25rem",
              borderRadius: "0.25rem",
              ...(msg.from === "client" ? { backgroundColor: "#dbeafe", alignSelf: "flex-end" } : { backgroundColor: "#d1fae5", alignSelf: "flex-start" }),
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          style={{ flex: "1", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "0.75rem", borderRadius: "0.25rem" }} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}