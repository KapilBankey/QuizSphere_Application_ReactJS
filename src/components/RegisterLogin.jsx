/*import React, { useState } from "react";
import "./RegisterLogin.css";

const RegisterLogin = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      console.log("Register Data:", formData);
      alert("Registration Successful!");
    } else {
      console.log("Login Data:", {
        email: formData.email,
        password: formData.password,
      });
      alert("Login Successful!");
    }
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="register-login-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </>
        )}

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>

      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        <span onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? " Login here" : " Register here"}
        </span>
      </p>
    </div>
  );
};

export default RegisterLogin;*/ import React, { useState } from "react";
import "./RegisterLogin.css";

const RegisterLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const toggleForm = () => setIsRegister(!isRegister);

  return (
    <div className="register-login-container">
      {/* Register/Login Button */}
      <button className="login-btn" onClick={toggleModal}>
        Register / Login
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* Close Icon (Top-Right) */}
            <span className="close-icon" onClick={toggleModal}>
              &times;
            </span>

            <h2>{isRegister ? "Register" : "Login"}</h2>

            {/* Form */}
            <form>
              {isRegister && (
                <>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </>
              )}

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />

              {isRegister && (
                <>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    required
                  />
                </>
              )}

              <button type="submit">{isRegister ? "Register" : "Login"}</button>
            </form>

            {/* Toggle Register/Login */}
            <p className="toggle-text">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
              <span onClick={toggleForm}>
                {isRegister ? " Login" : " Register"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterLogin;
