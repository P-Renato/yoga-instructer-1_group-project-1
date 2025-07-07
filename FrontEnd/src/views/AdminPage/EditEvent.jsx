import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditEvent() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const navigate = useNavigate();

  // Handle form submit
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newId = eventId ? Number(eventId) : allEvents.length + 1;

    const updatedEvent = {
      id: newId,
      title: formData.get('title'),
      img: formData.get('file')?.name || event.img,
      content: formData.get('content'),
      category: formData.get('category'),
      createdDay: formData.get('date') || event.createdDay,
    };

    console.log('Submitted Event:', updatedEvent);
    // work with backend to save the event

    navigate('/admin/eventList'); 
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetch('/database/data.json')
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data.events); // get all data to create new id for new event

        if (eventId) {
          const existingEvent = data.events.find((ev) => ev.id === Number(eventId)); // update old data
          if (existingEvent) {
            setEvent(existingEvent);
          } else {
            console.error('Event not found');
          }
        } else {
          setEvent({
            title: '',
            img: '',
            content: '',
            category: '',
            createdDay: new Date().toISOString().split('T')[0], // today
          });
        }
      });
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <form className='edit-form' onSubmit={submitHandler}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={event.title} onChange={changeHandler} />

        <label htmlFor="file">Cover photo</label>
        <input type="file" name="file" id="file" />

        <label htmlFor="content">Content</label>
        <textarea name="content" value={event.content} rows={15} cols={40} onChange={changeHandler} />

        <div className="edit-form-bottom">
          <div>
            <label htmlFor="category">Category</label>
            <input type="text" name="category" value={event.category} onChange={changeHandler} />
          </div>
          <div>
            <label htmlFor="publish">Publish date</label>
            <input type="date" name="date" value={event.createdDay} onChange={changeHandler} />
          </div>
        </div>

        <div>
          <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
          <button type="submit" className="post-btn">Post</button>
        </div>
      </form>
    </div>
  );
}
