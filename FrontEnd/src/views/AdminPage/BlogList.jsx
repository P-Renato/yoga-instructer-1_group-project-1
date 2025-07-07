import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/database/data.json')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blog.slice(0, 3));
      });
  }, []);

  const loadMoreHandler = () => {
    const currentIndex = blogs.length;
    fetch('/database/data.json')
      .then((res) => res.json())
      .then((data) => {
        if(currentIndex >= data.blog.length) {  
          alert('No more post of BLOG to load !');
          return
        } 
        const nextBlogs = data.blog.slice(currentIndex, currentIndex + 3);
        setBlogs((prev) => [...prev, ...nextBlogs]);
      });
  };

  return (
    <div>
      <h1>Post List:</h1>
      <NavLink to={`/admin/editBlog`}><button className='add-btn'>Add new blog</button></NavLink>
      {blogs.map((blog) => (
        <div className='info-container' key={blog.id}>
          <img src={`/${blog.img}`} alt='blog-image' />
          <div className='info-title'>
            <b>{blog.title}</b>
            <br />
            <NavLink to={`/admin/editBlog/${blog.id}`}><button className='edit-btn'>Edit</button></NavLink>
            <button className='delete-btn'>Delete</button>
          </div>
        </div>
      ))}
      <img
        className='arrow'
        src='/src/assets/images/down-arrow.svg'
        alt='arrow'
        onClick={loadMoreHandler}
      />
    </div>
  );
}
