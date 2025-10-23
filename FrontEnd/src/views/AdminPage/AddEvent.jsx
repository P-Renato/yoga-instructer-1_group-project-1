import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_BASE_URL} from '../../config/api.js'


export default function AddEvent() {
  const [event, setEvent] = useState({
    title: '',
    img: null,
    content: '',
    location: '',
  });

  const navigate = useNavigate();

// check changes of elements
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'img') {
      setEvent((prev) => ({ ...prev, img: files[0] }));
    } else {
      setEvent((prev) => ({ ...prev, [name]: value }));
    }
  };

// submit editing
  const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", event.title);
  formData.append("content", event.content);
  formData.append("location", event.location);
  if (event.img) {
    formData.append("img", event.img); 
  }

  fetch(`${API_BASE_URL}/events/add`, {
    method: "POST",
    body: formData,
  })
    .then(async (res) => {
      const data = await res.json(); // ⬅️ parse the JSON response

      if (!res.ok) {
        // Show error from backend (like file type error)
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


  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" name="title" value={event.title} onChange={handleChange} required />

      <label>Cover Photo</label>
      <input type="file" name="img" onChange={handleChange} accept="image/*" />

      <label>Content</label>
      <textarea
        name="content"
        rows={15}
        cols={40}
        value={event.content}
        onChange={handleChange}
        required
      />

      <label>Location</label>
      <input type="text" name="location" value={event.location} onChange={handleChange} required />

      <div className="form-actions">
        <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
        <button type="submit" className="post-btn">Submit</button>
      </div>
    </form>
  );
}
