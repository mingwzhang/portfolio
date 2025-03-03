// ContactForm.js
import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace these placeholders with your EmailJS details
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_USER_ID")
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "700px", // Explicit container width
        margin: "auto",
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
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
          style={{
            width: "100%", // Input spans full container width
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
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
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            minHeight: "400px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div>
        <button
          className="pixel-text pixel-btn-3d send-button-wrapper"
          type="submit"
          style={{ marginBottom: "20px" }}
        >
          <span className="pixel-btn-content">Send Message</span>
        </button>
      </div>

      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </form>
  );
};

export default ContactForm;
