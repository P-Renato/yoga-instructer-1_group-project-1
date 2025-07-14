import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditBlog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({
    title: '',
    img: null,
    content: '',
    category: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/api/blogs/${blogId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id === Number(blogId)) {
          setBlog(data);
        } else {
          console.error('Blog not found');
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'img') {
      setBlog((prev) => ({ ...prev, img: files[0] }));
    } else {
      setBlog((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('content', blog.content);
    formData.append('category', blog.category);
    if (blog.img) {
      formData.append('img', blog.img);
    }

    fetch(`http://localhost:5001/api/blogs/${blogId}`, {
      method: 'PATCH',
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
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

  if (!blog) return <div>Loading...</div>;

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" name="title" value={blog.title} onChange={handleChange} required />

      <label>Cover photo</label>
      <input type="file" name="img" onChange={handleChange} />
      {blog.img && (
        <img
          src={`http://localhost:5001/uploads/${blog.img}`}
          alt="Current"
          style={{ maxWidth: '150px', marginTop: '10px' }}
        />
      )}

      <label>Content</label>
      <textarea
        name="content"
        value={blog.content}
        rows={15}
        cols={40}
        onChange={handleChange}
        required
      />

      <div className="edit-form-bottom">
        <label>Category</label>
        <input type="text" name="category" value={blog.category} onChange={handleChange} required />

        <label>Publish date</label>
        <input type="date" name="createdDay" value={blog.createdDay} onChange={handleChange} />
      </div>

      <div>
        <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
        <button type="submit" className="post-btn">Submit</button>
      </div>
    </form>
  );
}
