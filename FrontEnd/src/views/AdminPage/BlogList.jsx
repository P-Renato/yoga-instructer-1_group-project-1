import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/blogs/all')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.slice(0, 3));
      });
  }, []);

  const loadMoreHandler = () => {
    const currentIndex = blogs.length;
    fetch('http://localhost:5001/api/blogs/all')
      .then((res) => res.json())
      .then((data) => {
        if (currentIndex >= data.length) {
          alert('No more post of BLOG to load !');
          return
        }
        const nextBlogs = data.slice(currentIndex, currentIndex + 3);
        setBlogs((prev) => [...prev, ...nextBlogs]);
      });
  };

  const deleteBlog = (id) => {
    fetch(`http://localhost:5001/api/blogs/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Blog ${id} deleted successfully.`);
          setBlogs(prev => prev.filter(blog => blog.id !== id));
          alert("This post of blog is deleted")
        } else {
          console.error(`Failed to delete blog ${id}`);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }

  return (
    <div>
      <h1>Post List:</h1>
      <NavLink to={`/admin/addBlog`}><button className='add-btn'>Add new blog</button></NavLink>
      {blogs.map((blog) => (
        <div className='info-container' key={blog.id}>
          <img src={`http://localhost:5001/uploads/${blog.img}`} alt='blog-image' />
          <div className='info-title'>
            <b>{blog.title}</b>
            <br />
            <NavLink to={`/admin/editBlog/${blog.id}`}><button className='edit-btn'>Edit</button></NavLink>
            <button className='delete-btn' onClick={() => deleteBlog(blog.id)}>Delete</button>
          </div>
        </div>
      ))}
      <img
        className='arrow'
        src='/src/public/images/down-arrow.svg'
        alt='arrow'
        onClick={loadMoreHandler}
      />
    </div>
  );
}
