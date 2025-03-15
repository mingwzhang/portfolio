import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactForm.css"; // Import the new CSS file

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false); // Flag to prevent multiple sends

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent duplicate submissions...
    if (isSending) return;
    setIsSending(true);

    emailjs
      .send(
        "service_kh8lbtv",
        "template_8z0b6aa",
        formData,
        "mnQpaviz3_3d37L_1"
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("Failed to send message. Please try again.");
        }
      )
      .finally(() => setIsSending(false));
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h4 className="pixel-text pixel-bold-title contact-title">
        <span className="emoji-large">📩</span> Contact Me
      </h4>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="contact-input"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="contact-input"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="contact-textarea"
        />
      </div>
      <div className="send-button-container">
        <button className="contact-button" type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </div>

      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </form>
  );
};

export default ContactForm;
