import React, { useEffect, useState } from 'react'
import msgListStyle from './styles/message_list.module.css'
import {API_BASE_URL} from '../../config/api.js'


export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=> {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/messages/all`);
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        console.log(data)
        setMessages(data);
      } catch (err) {
        console.error(err);
        setError("Could not load messages.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if(loading) return <p>Loading messages...</p>;
  if(error) return <p style={{color: "red"}}>{error}</p>;


  return (
    <div>
      <table className={msgListStyle.table}>
        <caption>Messages from the users</caption>
        <thead>
          <tr>
            <th  className={msgListStyle.tableList} scope='col'>Name</th>
            <th scope='col'>Message</th>
            <th scope='col'>email</th>
          </tr>
        </thead>
        <tbody>
           {messages.map(m => (
          <tr  key={m.id} >
           
            <th  className={msgListStyle.tableList} scope='row'>{m.firstName} {m.lastName}</th>
            <td>{m.message}</td>
            <td>{m.email}</td>
          </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    
  )
}
