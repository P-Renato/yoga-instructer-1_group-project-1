import {useState} from "react";
import './styles/Contact.css'


export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    
  };

  return (
    <div className="contact-section">
      <h1>Contact</h1>
      <form id="contact" onSubmit={handleSubmit}>
        <section className="contact-form-section">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}  />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}  />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" name="phone"  value={formData.phone} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <input type="text" name="message" id="message" placeholder="Write your message.." value={formData.message} onChange={handleChange} />
          </div>
        </section>
        <button className="contact-send-button" type="submit">Send</button>
      </form>
    </div>
  );
}
