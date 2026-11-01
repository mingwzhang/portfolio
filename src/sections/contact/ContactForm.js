import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setStatus("");
    setStatusType("");

    try {
      await emailjs.send(
        "service_s3eh3hi",  // Existing EmailJS service ID
        "template_7i16ush", // Existing EmailJS template ID
        formData,           // Existing form field names
        "mnQpaviz3_3d37L_1" // Existing public key (safe to include in client code)
      );

      setStatus("Message sent successfully!");
      setStatusType("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // EmailJS returns status and text for most API failures. Preserve them
      // in the browser console so the real cause can be diagnosed.
      console.error("EmailJS contact form failed:", {
        status: error?.status ?? "unknown",
        text: error?.text || error?.message || "No details returned",
      });
      setStatus("Message could not be sent. Please use the email link below.");
      setStatusType("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h4 className="pixel-text pixel-bold-title contact-title">
        Contact Me
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
        <p className={`contact-status ${statusType}`} role="status" aria-live="polite">
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
