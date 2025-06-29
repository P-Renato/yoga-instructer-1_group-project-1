import React from 'react'
import './Admin.css'
import { useNavigate } from 'react-router-dom';

export default function Login({ setLoggedIn }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);      // Set loggedIn to true
    navigate('/admin');     // Redirect to /admin
  };

  return (
    <div className='login-page'>
      <h2>Administrator Page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" /><br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}