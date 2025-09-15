import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddInfo() {
  const [info, setInfo] = useState({
    content: '',
  });

  const navigate = useNavigate();

// check changes of elements
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

// submit adding
  const handleSubmit = (e) => {
  e.preventDefault();

  fetch("http://localhost:5001/api/infos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: info.content }),
  })
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error || 'Something went wrong'}`);
      } else {
        alert("Information uploaded successfully!");
        navigate("/admin/moreInfo");
      }
    })
    .catch((err) => {
      console.error("Network error:", err);
      alert("Network error");
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

      <div className="form-actions">
        <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
        <button type="submit" className="post-btn">Submit</button>
      </div>
    </form>
  );
}
