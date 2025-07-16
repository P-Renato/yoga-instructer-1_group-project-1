import React, { useEffect, useState } from 'react'

export default function EventPost() {
  const [events, setEvent] = useState([]);

  useEffect(() => {
    fetch("/database/data.json")
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.events || []);
      })
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  return (
    <div>
      <h1>fetchdata</h1>
      {events.map((event, index) => (
        <div
          key={event.id}
          style={{
            display: "flex",
            alignItems: "flex-start", // fixed typo here
          }}
        >
          <img
            src={`/images/event${index + 1}.jpg`}
            alt={event.title}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
              backgroundColor: "#ccc",
            }}
          />
          <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
            {event.createdDay}
          </p>
          <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
            {event.location}
          </p>
          <h2
            style={{
              fontSize: "1.2rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            {event.title}
          </h2>
          <p style={{ lineHeight: "1.5", color: "#ddd" }}>{event.content}</p>
        </div>
      ))}

      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: "2rem", color: "#ddd" }}>▼</span>
      </div>
    </div>
  );
}