import React, { useState } from "react";
import emailjs from "emailjs-com";

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
      .send("service_kh8lbtv", "template_8z0b6aa", formData, "mnQpaviz3_3d37L_1")
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
    <form
      onSubmit={handleSubmit}
      style={{
        width: "700px",
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
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "0.9rem",
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
            fontSize: "0.9rem",
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
            fontSize: "0.9rem",
          }}
        />
      </div>
      <div>
        <button
          className="pixel-text pixel-btn-3d send-button-wrapper"
          type="submit"
          style={{ marginBottom: "20px" }}
          disabled={isSending} // Disable when sending
        >
          <span className="pixel-btn-content">
            {isSending ? "Sending..." : "Send Message"}
          </span>
        </button>
      </div>

      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </form>
  );
};

export default ContactForm;
