import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import API_BASE_URL from '../config/api.js';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/events/all`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.slice(0, 3));
      });
  }, []);

  const loadMoreHandler = () => {
    const currentIndex = events.length;
    fetch(`${API_BASE_URL}/events/all`)
      .then((res) => res.json())
      .then((data) => {
        if (currentIndex >= data.length) {
          alert('No more post of EVENT to load !');
          return
        }
        const nextEvents = data.slice(currentIndex, currentIndex + 3);
        setEvents((prev) => [...prev, ...nextEvents]);
      });
  };

  const deleteEvent = (id) => {
    fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Event ${id} deleted successfully.`);
          setEvents(prev => prev.filter(event => event.id !== id));
          alert("This post of event is deleted")
        } else {
          console.error(`Failed to delete event ${id}`);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }

  return (
    <div>
      <h1>Post List:</h1>
      <NavLink to={`/admin/addEvent`}><button className='add-btn'>Add new event</button></NavLink>
      {events.map((event) => (
        <div className='info-container' key={event.id}>
          <img src={`${API_BASE_URL.replace('/api', '')}/uploads/${event.img}`} alt='event-image' />
          <div className='info-title'>
            <b>{event.title}</b>
            <br />
            <NavLink to={`/admin/editEvent/${event.id}`}><button className='edit-btn'>Edit</button></NavLink>
            <button className='delete-btn' onClick={() => deleteEvent(event.id)}>Delete</button>
          </div>
        </div>
      ))}
      <img
        className='arrow'
        src='/src/public/images/down-arrow.svg'
        alt='arrow'
        onClick={loadMoreHandler}
      />
    </div>
  );
}
