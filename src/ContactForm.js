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
 const [statusType, setStatusType] = useState("");
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
        "service_s3eh3hi",  // Service ID
        "template_7i16ush", // Template ID
        formData,           // Template parameters / form data
        "mnQpaviz3_3d37L_1" // Public key
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          setStatusType("success");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("Failed to send message. Please try again.");
          setStatusType("error");
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

      {status && (
        <p className={`contact-status ${statusType}`}>
          {status}
        </p>
      )}

      <div className="contact-fallback">
        <p>If the form does not work, you can contact me directly:</p>
        <p>
          Email:{" "}
          <a href="mailto:mingw.zhang123@gmail.com">
            mingw.zhang123@gmail.com
          </a>
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
