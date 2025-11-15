import React, { useState } from "react";
import "./RegisterLogin.css";

const RegisterLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setSubmitStatus(null);
      setIsRegister(false);
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setSubmitStatus(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 3000);
        return;
      }
      if (formData.password.length < 6) {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 3000);
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call (replace with actual API call)
    setTimeout(() => {
      console.log(isRegister ? "Register Data:" : "Login Data:", formData);
      setSubmitStatus("success");
      setIsSubmitting(false);
      
      if (isRegister) {
        setTimeout(() => {
          setIsRegister(false);
          setFormData({ name: "", email: "", password: "", confirmPassword: "" });
          setSubmitStatus(null);
        }, 2000);
      } else {
        setTimeout(() => {
          toggleModal();
        }, 2000);
      }
    }, 1500);
  };

  return (
    <div className="register-login-container">
      {/* Register/Login Button */}
      <button className="login-btn" onClick={toggleModal}>
        <span className="btn-icon">🔐</span>
        Register / Login
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <>
          <div className="modal-overlay" onClick={toggleModal}></div>
          <div className="modal">
            <div className="modal-content">
              {/* Close Icon */}
              <button className="close-icon" onClick={toggleModal} aria-label="Close">
                &times;
              </button>

              {/* Header */}
              <div className="modal-header">
                <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
                <p className="modal-subtitle">
                  {isRegister
                    ? "Join QuizSphere to start your learning journey"
                    : "Sign in to continue your learning journey"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="auth-form">
                {isRegister && (
                  <div className="form-group">
                    <label htmlFor="name">
                      <span className="label-icon">👤</span> Full Name *
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
                )}

                <div className="form-group">
                  <label htmlFor="email">
                    <span className="label-icon">📧</span> Email Address *
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
                  <label htmlFor="password">
                    <span className="label-icon">🔒</span> Password *
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {isRegister && (
                    <small className="form-hint">
                      Password must be at least 6 characters
                    </small>
                  )}
                </div>

                {isRegister && (
                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      <span className="label-icon">🔒</span> Confirm Password *
                    </label>
                    <div className="password-input-wrapper">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>
                )}

                {submitStatus && (
                  <div className={`status-message ${submitStatus}`}>
                    {submitStatus === "success"
                      ? isRegister
                        ? "✅ Registration successful! Redirecting to login..."
                        : "✅ Login successful! Welcome back!"
                      : "❌ " + (isRegister && formData.password !== formData.confirmPassword
                        ? "Passwords do not match!"
                        : isRegister && formData.password.length < 6
                        ? "Password must be at least 6 characters!"
                        : "Something went wrong. Please try again.")}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      {isRegister ? "Creating Account..." : "Logging in..."}
                    </>
                  ) : (
                    <>
                      {isRegister ? "Create Account" : "Login"}
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>
              </form>

              {/* Toggle Register/Login */}
              <div className="toggle-section">
                <p className="toggle-text">
                  {isRegister ? "Already have an account?" : "Don't have an account?"}
                  <button type="button" className="toggle-link" onClick={toggleForm}>
                    {isRegister ? " Login here" : " Register here"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterLogin;
