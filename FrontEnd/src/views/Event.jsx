import React, { useContext } from 'react'
import { blogContext } from './BlogContext'
import './styles/Event.css'
// import API_BASE_URL from '../config/api'

export default function Event() {
  const {events} = useContext(blogContext)
  console.log(events)

  if(!events.length) return <p>Loading Events posts...</p>
  return (
    <div className='event-body'>
        <div className='event-section' id='event'>
          <h1>Events</h1>
          {events.map(event => (
            <div>
              <section  className='event-posts'>
                <nav>
                  <img src={`images/${event.img}`} alt="Event-Img" />
                </nav>
                <nav className='event-text-section'>
                  <p>{event.createdDay}</p>
                  <h4>{event.location}</h4>
                  <h1>{event.title}</h1>
                  <p>{event.content}</p>
                </nav>
              </section>
            </div>
          ))}
        
        </div>
    </div>
  )
}
