import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/api';

export default function AddBlog() {
  const [blog, setBlog] = useState({
    title: '',
    img: null,
    content: '',
    category: '',
  });

  const navigate = useNavigate();

// check changes of elements
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'img') {
      setBlog((prev) => ({ ...prev, img: files[0] }));
    } else {
      setBlog((prev) => ({ ...prev, [name]: value }));
    }
  };

// submit editing
  const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", blog.title);
  formData.append("content", blog.content);
  formData.append("category", blog.category);
  if (blog.img) {
    formData.append("img", blog.img); 
  }

  fetch(`${API_BASE_URL}/blogs/add`, {
    method: "POST",
    body: formData,
  })
    .then(async (res) => {
      const data = await res.json(); // ⬅️ parse the JSON response

      if (!res.ok) {
        // Show error from backend (like file type error)
        alert(`Error: ${data.error || 'Something went wrong'}`);
      } else {
        alert("Blog uploaded successfully!");
        navigate("/admin/blogList");
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
      <input type="text" name="title" value={blog.title} onChange={handleChange} required />

      <label>Cover Photo</label>
      <input type="file" name="img" onChange={handleChange} accept="image/*" />

      <label>Content</label>
      <textarea
        name="content"
        rows={15}
        cols={40}
        value={blog.content}
        onChange={handleChange}
        required
      />

      <label>Category</label>
      <input type="text" name="category" value={blog.category} onChange={handleChange} required />

      <div className="form-actions">
        <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
        <button type="submit" className="post-btn">Submit</button>
      </div>
    </form>
  );
}
