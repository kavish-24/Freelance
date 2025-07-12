import React, { useState, useEffect, useRef } from "react";

export default function ChatWindow({ bookingId }) {
  const [messages, setMessages] = useState([
    { from: "client", text: "Hi, are you available?" },
    { from: "worker", text: "Yes, I am!" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "client", text: input }]);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const styles = {
    container: {
      backgroundColor: "#9abedaff", // ✅ New background color
      borderRadius: "0.75rem",
      padding: "1rem",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    },
    messagesBox: {
      height: "12rem",
      overflowY: "auto",
      marginBottom: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      paddingRight: "0.25rem",
    },
    message: {
      maxWidth: "75%",
      padding: "0.5rem 0.75rem",
      borderRadius: "1rem",
      fontSize: "0.9rem",
      wordWrap: "break-word",
    },
    clientBubble: {
      alignSelf: "flex-end",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      borderTopRightRadius: "0",
    },
    workerBubble: {
      alignSelf: "flex-start",
      backgroundColor: "#e5e7eb",
      color: "#111827",
      borderTopLeftRadius: "0",
    },
    inputRow: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center",
    },
    input: {
      flex: 1,
      padding: "0.625rem 0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.375rem",
      fontSize: "0.95rem",
      outline: "none",
      backgroundColor: "#ffffff",
    },
    button: {
      backgroundColor: "#2563eb",
      color: "#ffffff",
      padding: "0.625rem 1rem",
      borderRadius: "0.375rem",
      fontWeight: 600,
      cursor: "pointer",
      border: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.messagesBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              ...(msg.from === "client"
                ? styles.clientBubble
                : styles.workerBubble),
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={sendMessage} style={styles.inputRow}>
        <input
          type="text"
          placeholder="Type a message..."
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}
