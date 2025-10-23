import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {API_BASE_URL} from '../../config/api.js'

export default function EditEvent() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({
    title: '',
    img: null,
    content: '',
    location: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id === Number(eventId)) {
          setEvent(data);
        } else {
          console.error('Blog not found');
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'img') {
      setEvent((prev) => ({ ...prev, img: files[0] }));
    } else {
      setEvent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('content', event.content);
    formData.append('category', event.category);
    if (event.img) {
      formData.append('img', event.img);
    }

    fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'PATCH',
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          alert(`Error: ${data.error || 'Something went wrong'}`);
        } else {
          alert("Event uploaded successfully!");
          navigate("/admin/eventList");
        }
      })
      .catch((err) => {
        console.error("Network error:", err);
        alert("Network error");
      });
  };

  if (!event) return <div>Loading...</div>;

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" name="title" value={event.title} onChange={handleChange} required />

      <label>Cover photo</label>
      <input type="file" name="img" onChange={handleChange} />
      {event.img && (
        <img
          src={`${API_BASE_URL.replace('/api', '')}/uploads/${event.img}`}
          alt="Current"
          style={{ maxWidth: '150px', marginTop: '10px' }}
        />
      )}

      <label>Content</label>
      <textarea
        name="content"
        value={event.content}
        rows={15}
        cols={40}
        onChange={handleChange}
        required
      />

      <div className="edit-form-bottom">
        <label>Location</label>
        <input type="text" name="location" value={event.location} onChange={handleChange} required />

        <label>Publish date</label>
        <input type="date" name="createdDay" value={event.createdDay} onChange={handleChange} />
      </div>

      <div>
        <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
        <button type="submit" className="post-btn">Submit</button>
      </div>
    </form>
  );
}
