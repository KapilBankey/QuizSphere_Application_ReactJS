import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
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
        "service_w433t5n", // Service ID
        "template_u2qnp7m", // Template ID
        {
          name: formData.name,
          email: formData.email,
          rating: formData.rating || "Not provided",
          message: formData.message,
        },
        "_otMUuF0oa0Lg038S" // Public Key
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", rating: "", message: "" });
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
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>Share Your Feedback</h1>
        <p className="feedback-intro">
          Your opinion matters! Help us improve QuizSphere by sharing your thoughts, 
          suggestions, or reporting any issues you've encountered.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="name">
            <span className="label-icon">👤</span> Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <span className="label-icon">📧</span> Your Email *
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
          <label htmlFor="rating">
            <span className="label-icon">⭐</span> How would you rate your experience?
          </label>
          <div className="rating-buttons">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                className={`rating-btn ${formData.rating === rating.toString() ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, rating: rating.toString() })}
              >
                ⭐ {rating}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">
            <span className="label-icon">💬</span> Your Feedback / Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows="6"
            placeholder="Please share your feedback, suggestions, or any issues you've encountered..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {submitStatus && (
          <div className={`status-message ${submitStatus}`}>
            {submitStatus === "success"
              ? "✅ Thank you for your feedback! We appreciate your input."
              : "❌ Failed to submit feedback. Please try again later."}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner"></span> Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </button>
      </form>

      <div className="feedback-note">
        <p>💡 <strong>Note:</strong> Your feedback helps us improve QuizSphere for all users. Thank you for taking the time to share your thoughts!</p>
      </div>
    </div>
  );
};

export default Feedback;
