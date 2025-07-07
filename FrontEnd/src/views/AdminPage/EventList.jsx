import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function EventList() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch('/database/data.json')
      .then((res) => res.json())
      .then((data) => { 
        setEvents(data.events.slice(0, 3));
       })
  }, [])

  const loadMoreHandler = () => {
    const currentIndex = events.length;
    fetch('/database/data.json')
      .then((res) => res.json())
      .then((data) => {
        if(currentIndex >= data.events.length) {  
          alert('No more post of EVENT to load !');
          return
        } 
        const nextEvents = data.events.slice(currentIndex, currentIndex + 3);
        setEvents((prev) => [...prev, ...nextEvents]);
      });
  };

  return (
    <div>
      <h1>Event List:</h1>
      <NavLink to={`/admin/editEvent`}><button className='add-btn'>Add new event</button></NavLink>
      {events.map((event) => (
        <div className='info-container' key={event.id}>
          <img src={`../${event.img}`} alt="event-image" />          
          <div className='info-title'>
            <b>{event.title}</b><br />
            <NavLink to={`/admin/editEvent/${event.id}`}><button className='edit-btn'>Edit</button></NavLink>
            <button className='delete-btn'>Delete</button>
          </div>
        </div>
      ))}
      <img className='arrow' src="/src/assets/images/down-arrow.svg" alt="arrow" onClick={loadMoreHandler} />
    </div>
  )
}