import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/api.js'

export default function EditInfo() {
  const { infoId } = useParams(); 
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();

  // Fetch existing info
  useEffect(() => {
    fetch(`${API_BASE_URL}/infos/${infoId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id === Number(infoId)) {
          setInfo(data);
        } else {
          alert('Info not found');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        alert('Failed to fetch info');
      });
  }, [infoId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/infos/${infoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          alert(`Error: ${data.error || 'Something went wrong'}`);
        } else {
          alert('Info updated successfully!');
          navigate('/admin/moreInfo');
        }
      })
      .catch((err) => {
        console.error('Network error:', err);
        alert('Network error');
      });
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <label>Content</label>
      <textarea
        name="content"
        rows={15}
        cols={40}
        value={info.content}
        onChange={handleChange}
        required
      />

      <label>Created Day</label>
      <input
        type="date"
        name="createdDay"
        value={info.createdDay}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button type="button" className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <button type="submit" className="post-btn">
          Submit
        </button>
      </div>
    </form>
  );
}
