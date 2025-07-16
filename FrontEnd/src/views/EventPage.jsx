import React, { useEffect, useState } from "react";
import "./EventPage.css";
// import data from '/../database/data.json';

export default function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setEvents(data.events))
      .catch((err) => console.error("Failed to load events", err));
  }, []);

  return (
    <div className="event-container">
      <h1 className="event-title">Events</h1>

      {events.map((event, index) => (
        <div className="event-card" key={event.id}>
          <img
            className="event-image"
            src={`/images/event${index + 1}.jpg`} // optional image indexing
            alt={event.title}
          />
          <div className="event-details">
            <p className="event-date">{event.createdDay}</p>
            <p className="event-location">{event.location}</p>
            <h2 className="event-heading">{event.title}</h2>
            <p className="event-description">{event.content}</p>
          </div>
        </div>
      ))}

      {/* <div className="scroll-down">
        <span>▼</span>
      </div> */}
    </div>
  );
}
