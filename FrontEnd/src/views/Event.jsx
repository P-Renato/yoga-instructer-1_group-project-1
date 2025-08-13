import React, { useContext } from 'react'
import { blogContext } from './BlogContext'

export default function Event() {
  const {events} = useContext(blogContext)
  console.log(events)

  if(!events.length) return <p>Loading Events posts...</p>
  return (
    <div id='event'>
      <h1>Events</h1>
      {events.map(event => (
        <div>
        <section>
          <nav>
            <img src={`http://localhost:5001/uploads/${event.img}`} alt="Event-Img" />
          </nav>
          <nav>
            <p>{event.createdDay}</p>
            <h4>{event.location}</h4>
            <h1>{event.title}</h1>
            <p>{event.content}</p>
          </nav>
        </section>
      </div>
      ))}
      
    </div>
  )
}
