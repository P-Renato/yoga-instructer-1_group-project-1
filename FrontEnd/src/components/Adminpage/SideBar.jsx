import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar() {
  return (
    <div className='sidebar'>
      <img
        src="../src/assets/images/profile.png"
        alt="profile"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          objectFit: "cover"
        }}
      />

      <b><NavLink to="editAdmin" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Carolina Rose</NavLink></b>
      <ul>
        <li><NavLink to="blogList" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Manage Blog Posts</NavLink></li>
        <li><NavLink to="eventList"  className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Manage Event Posts</NavLink></li>
        <li><NavLink to="moreInfo"  className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Additional Info</NavLink></li>
      </ul>
    </div>
  )
}
