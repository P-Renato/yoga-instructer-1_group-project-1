import React, { useState } from "react";
import './Contact.css';
import Footer from './Footer.jsx';

export default function ThankyouPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "Doe",
    email: "",
    phone: "+1 012 3456 789",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleBack = () => {
    setSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "Doe",
      email: "",
      phone: "+1 012 3456 789",
      message: "",
    });
  }

  if (submitted) {
    return (
      <div className="thank-you-container">
        <h1>Thank you for reaching out.</h1>
        <p>Your message has been received and I will get back to you as soon as possible.</p>
        <p>Until then, take a deep breath and trust the flow.</p>
        <button className="submit-button" onClick={handleBack}>Back</button>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="W
rite your message.."
          />
        </div>
        <div className="form-footer">
          <button type="submit" className="submit-button">Send</button>
        </div>
      </form>
      <Footer/> 
    </div>
  );
}
