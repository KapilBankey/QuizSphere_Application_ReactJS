import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        "service_mp4q1ed", // Service ID
        "template_u2qnp7m", // Template ID
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || "Contact Form Inquiry",
          message: formData.message,
        },
        "_otMUuF0oa0Lg038S" // Public Key
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p className="contact-intro">
          Have questions, feedback, or suggestions? We'd love to hear from you! 
          Fill out the form below or reach us through our contact information.
        </p>
      </div>

      <div className="contact-wrapper">
        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">
                <span className="label-icon">👤</span> Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">
                  <span className="label-icon">📧</span> Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <span className="label-icon">📱</span> Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">
                <span className="label-icon">📌</span> Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What is this regarding?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <span className="label-icon">💬</span> Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell us how we can help you..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {submitStatus && (
              <div className={`status-message ${submitStatus}`}>
                {submitStatus === "success"
                  ? "✅ Message sent successfully! We'll get back to you soon."
                  : "❌ Failed to send message. Please try again later."}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="contact-info-section">
          <h2>Get in Touch</h2>
          
          <div className="contact-info-card">
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <h3>Email</h3>
                <p>example123@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📱</div>
              <div className="info-content">
                <h3>Phone</h3>
                <p>+91-1234567890</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Office Address</h3>
                <p>
                  QuizSphere Solutions<br />
                  123, Education Street<br />
                  Knowledge City, India
                </p>
              </div>
            </div>
          </div>

          <div className="social-media-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link" title="Facebook">
                📘 Facebook
              </a>
              <a href="#" className="social-link" title="Instagram">
                📷 Instagram
              </a>
              <a href="#" className="social-link" title="Twitter">
                🐦 Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
