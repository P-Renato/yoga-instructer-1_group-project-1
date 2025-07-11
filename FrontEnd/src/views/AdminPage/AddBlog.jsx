import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddBlog() {
  const [blog, setBlog] = useState({
    title: '',
    img: '',
    content: '',
    category: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setBlog((prev) => ({
      ...prev,
      [name]: name === 'file' && files.length ? files[0].name : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      title: blog.title,
      img: blog.img,
      content: blog.content,
      category: blog.category,
    };

    fetch('http://localhost:5001/api/blogs/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog),
    })
      .then((res) => {
        if (res.ok) {
          navigate('/admin/blogList');
        } else {
          console.error('Failed to submit blog');
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" name="title" value={blog.title} onChange={handleChange} required />

      <label>Cover Photo</label>
      <input type="file" name="file" onChange={handleChange} />

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
