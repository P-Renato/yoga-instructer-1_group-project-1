import React from 'react'
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import API_BASE_URL from '../../config/api.js'


export default function MoreInfo() {
  const [infos, setInfos] = useState([]);
  
    useEffect(() => {
      fetch(`${API_BASE_URL}/infos/all`)
        .then((res) => res.json())
        .then((data) => {
          setInfos(data.slice(0, 3));
        });
    }, []);
  
    const loadMoreHandler = () => {
      const currentIndex = infos.length;
      fetch(`${API_BASE_URL}/infos/all`)
        .then((res) => res.json())
        .then((data) => {
          if (currentIndex >= data.length) {
            alert('No more post of INFORMATION to load !');
            return
          }
          const nextInfos = data.slice(currentIndex, currentIndex + 3);
          setInfos((prev) => [...prev, ...nextInfos]);
        });
    };
  
    const deleteInfo = (id) => {
      fetch(`${API_BASE_URL}/infos/${id}`, {
        method: "DELETE"
      })
        .then((res) => {
          if (res.ok) {
            console.log(`Information ${id} deleted successfully.`);
            setInfos(prev => prev.filter(info => info.id !== id));
            alert("This post of Information is deleted")
          } else {
            console.error(`Failed to delete information ${id}`);
          }
        })
        .catch((err) => console.error("Fetch error:", err));
    }
  return (
    <div>
      <h1>Information List:</h1>
      <NavLink to={`/admin/addInfo`}><button className='add-btn'>Add new information</button></NavLink>
      {infos.map((info) => (
        <div className='info-container' key={info.id}>
          <div className='info-title'>
            <b>{info.content}</b>
            <br />
            <NavLink to={`/admin/editInfo/${info.id}`}><button className='edit-btn'>Edit</button></NavLink>
            <button className='delete-btn' onClick={() => deleteInfo(info.id)}>Delete</button>
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
