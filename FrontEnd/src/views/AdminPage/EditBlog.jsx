import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditBlog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const navigate = useNavigate();

  // Handle form submit
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newId = blogId ? Number(blogId) : allBlogs.length + 1;

    const updatedBlog = {
      id: newId,
      title: formData.get('title'),
      img: formData.get('file')?.name || blog.img || '',
      content: formData.get('content'),
      category: formData.get('category'),
      createdDay: formData.get('date') || blog.createdDay,
    };
    
    console.log('Submitted Blog:', updatedBlog);

   

    navigate('/admin/blogList');
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetch('/database/data.json')
      .then((res) => res.json())
      .then((data) => {
        setAllBlogs(data.blog || []);

        if (blogId) {
          const existingBlog = data.blog.find((b) => b.id === Number(blogId));
          if (existingBlog) {
            setBlog(existingBlog);
          } else {
            console.error('Blog not found');
          }
        } else {
          setBlog({
            title: '',
            img: '',
            content: '',
            category: '',
            createdDay: new Date().toISOString().split('T')[0],
          });
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  }, [blogId]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <form className="edit-form" onSubmit={submitHandler}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={blog.title} onChange={changeHandler} />

        <label htmlFor="file">Cover photo</label>
        <input type="file" name="file" id="file" />

        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          value={blog.content}
          rows={15}
          cols={40}
          onChange={changeHandler}
          
        />

        <div className="edit-form-bottom">
          <div>
            <label htmlFor="category">Category</label>
            <input type="text" name="category" value={blog.category} onChange={changeHandler} />
          </div>
          <div>
            <label htmlFor="date">Publish date</label>
            <input type="date" name="date" value={blog.createdDay} onChange={changeHandler} />
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
