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

  const handleChange =(e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    
    try {
    const res = await fetch("http://localhost:5001/api/messages/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("Response from server:", data);

    if (res.ok) {
      alert("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } else {
      alert("Error: " + data.error || "Something went wrong");
    }
  } catch (err) {
    console.error("Error sending message:", err);
    alert("Could not send message. Please try again later.");
  }
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
